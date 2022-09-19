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

  onMessageBox(){
    this.msgbox.show();
  }
}
