import { FlexibleConnectedPositionStrategy } from "@angular/cdk/overlay";
import { Directive, HostListener, Input } from "@angular/core";
import { MatMenuPanel, MenuPositionX, MenuPositionY, _MatMenuTriggerBase } from "@angular/material/menu";
import { fromEvent, merge } from "rxjs";

// @Directive declaration styled same as matMenuTriggerFor
// with different selector and exportAs.
@Directive({
  selector: `[matContextMenuTriggerFor]`,
  host: {
    'class': 'mat-menu-trigger',
  },
  exportAs: 'matContextMenuTrigger',
})
export class MatContextMenuTrigger extends _MatMenuTriggerBase {

  // Duplicate the code for the matMenuTriggerFor binding
  // using a new property and the public menu accessors.
  @Input('matContextMenuTriggerFor')
  get menu_again() {
    this.menu
    return this.menu;
  }
  set menu_again(menu: MatMenuPanel|null) {
    this.menu = menu;
  }

  // Make sure to ignore the original binding
  // to allow separate menus on each button.
  @Input('matMenuTriggerFor')
  set ignoredMenu(value: any) { }

  // Override _handleMousedown, and call super._handleMousedown
  // with a new MouseEvent having button numbers 2 and 0 reversed.
  override _handleMousedown(event: MouseEvent): void {
    return super._handleMousedown(new MouseEvent(event.type, Object.assign({}, event, { button: event.button === 0 ? 2 : event.button === 2 ? 0 : event.button })));
  }

  // Override _handleClick to make existing binding to clicks do nothing.
  override _handleClick(event: MouseEvent): void { }

  // Create a place to store the host element.
  private hostElement: EventTarget | null = null;

  // Listen for contextmenu events (right-clicks), then:
  //  1) Store the hostElement for use in later events.
  //  2) Prevent browser default action.
  //  3) Call super._handleClick to open the menu as expected.
  @HostListener('contextmenu', ['$event'])
  _handleContextMenu(event: MouseEvent): void {
    this.hostElement = event.target;
    if (event.shiftKey) return; // Hold a shift key to open original context menu. Delete this line if not desired behavior.
    event.preventDefault();
    super._handleClick(event);
  }

  // The complex logic below is to handle submenus and hasBackdrop===false well.
  // Listen for click and contextmenu (right-click) events on entire document.
  // If this menu is open, one of the following conditional actions.
  //   1) If the click came from the overlay backdrop, close the menu and prevent default.
  //   2) If the click came inside the overlay container, it was on a menu. If it was
  //      a contextmenu event, prevent default and re-dispatch it as a click.
  //   3) If the event did not come from our host element, close the menu.
  private contextListenerSub = merge(
    fromEvent(document, "contextmenu"),
    fromEvent(document, "click"),
  ).subscribe(event => {
    if (this.menuOpen) {
      if (event.target) {
        const target = event.target as HTMLElement;
        if (target.classList.contains("cdk-overlay-backdrop")) {
          event.preventDefault();
          this.closeMenu();
        } else {
          let inOverlay = false;
          document.querySelectorAll(".cdk-overlay-container").forEach(e => {
            if (e.contains(target))
              inOverlay = true;
          });
          if (inOverlay) {
            if (event.type === "contextmenu") {
              event.preventDefault();
              event.target?.dispatchEvent(new MouseEvent("click", event));
            }
          } else
            if (target !== this.hostElement)
              this.closeMenu();
        }
      }
    }
  });

  // When destroyed, stop listening for the contextmenu events above,
  // null the host element reference, then call super.
  override ngOnDestroy() {
    this.contextListenerSub.unsubscribe();
    this.hostElement = null;
    return super.ngOnDestroy();
  }

//   /**
//    * Listens to changes in the position of the overlay and sets the correct classes
//    * on the menu based on the new position. This ensures the animation origin is always
//    * correct, even if a fallback position is used for the overlay.
//    */
//     private override _subscribeToPositions(menu: MatMenuPanel, position: FlexibleConnectedPositionStrategy) {
//     if (menu.setPositionClasses) {
//       position.positionChanges.subscribe(change => {
//         const posX: MenuPositionX = change.connectionPair.overlayX === 'start' ? 'after' : 'before';
//         const posY: MenuPositionY = change.connectionPair.overlayY === 'top' ? 'below' : 'above';

//         // @breaking-change 15.0.0 Remove null check for `ngZone`.
//         // `positionChanges` fires outside of the `ngZone` and `setPositionClasses` might be
//         // updating something in the view so we need to bring it back in.
//         // if (this._ngZone) {
//         //   this._ngZone.run(() => menu.setPositionClasses!(posX, posY));
//         // } else {
//         //   menu.setPositionClasses!(posX, posY);
//         // }
//       });
    // }
//   }
}