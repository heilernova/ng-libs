import { Component } from '@angular/core';
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
  // }
}
