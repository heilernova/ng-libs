import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
// import { MessageBoxService } from 'ng-nova';
import { MessageBoxService } from 'projects/ng-nova/src/public-api';
import { environment } from '../environments/environment';
import { CompatibleInputEvent, IS_INPUT_SUPPORTED, normalizeInputEvent } from './inputs/test-event/events';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  get type(){
    return environment.api;
  }
  constructor(
    private msgbox:MessageBoxService
  ){

    // document.body.addEventListener("DOMNodeInserted", (e) => {
    //   let element = e.target;
    //   if (element instanceof HTMLElement){
    //     if (element.classList.contains('cdk-overlay-backdrop')){

    //       // // console.log("Evento ");
    //       // element.addEventListener("contextmenu", (e) => {
    //       //   e.stopPropagation();
    //       //   e.preventDefault();
    //       //   (e.target as HTMLDivElement).click();
    //       // });
    //     }
    //   }
    // });
  }

  onMessageBox(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.show("Hola", { disableClose, confirm });
  }

  onMessageBoxAlert(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.alert("Hola", { disableClose, confirm });
  }
  onMessageBoxInfo(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.info("Hola", { disableClose, confirm });
  }
  onMessageBoxError(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.error("Hola", { disableClose, confirm });
  }
  // onMessageBoxAlert(confirm:boolean = false, disableClose?:boolean){
  //   this.msgbox.show("Hola");
  // }}


  openContextMenu(
    event: MouseEvent,
    trigger: MatMenuTrigger,
    triggerElement: HTMLElement
  ) {
    triggerElement.style.left = event.clientX + 5 + "px";
    triggerElement.style.top = event.clientY + 5 + "px";
    if (trigger.menuOpen) {
      trigger.closeMenu();
      trigger.openMenu();
    } else {
      trigger.openMenu();
    }
    event.preventDefault();
  }
}
