import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from './message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(
    private _matDialog:MatDialog
  ) { }

  show(){
    this._matDialog.open(MessageBox, {
      minWidth: '200px',
      panelClass: 'nv-panel-dialog',
      autoFocus: false
    });
  }
}
