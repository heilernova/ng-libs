import { Component } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
// import { MessageBoxService } from 'ng-nova';
import { MessageBoxService } from 'projects/ng-nova/src/public-api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private msgbox:MessageBoxService
  ){
    // loadInputsEvents();
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
