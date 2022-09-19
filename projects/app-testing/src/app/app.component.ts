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
    this.msgbox.show("Hola");
  }

  onMessageBoxAlert(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.alert("Hola");
  }
  onMessageBoxInfo(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.info("Hola");
  }
  onMessageBoxError(confirm:boolean = false, disableClose?:boolean){
    this.msgbox.error("Hola");
  }
  // onMessageBoxAlert(confirm:boolean = false, disableClose?:boolean){
  //   this.msgbox.show("Hola");
  // }
}
