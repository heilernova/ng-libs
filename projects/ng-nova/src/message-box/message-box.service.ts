import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { config } from 'rxjs';
import { MessageBox, MessageBoxData, MessageBoxType } from './message-box.component';

@Injectable({
  providedIn: 'root'
})
export class MessageBoxService {

  constructor(
    private _matDialog:MatDialog
  ) { }

  private _open(message:string, title?:string, type?:MessageBoxType, config?:{confirm?:boolean, disableClose?:boolean }):MatDialogRef<MessageBox, boolean | undefined>{
    return this._matDialog.open<MessageBox, MessageBoxData>(MessageBox, {
      minWidth: '200px',
      panelClass: 'nv-dialog-panel',
      autoFocus: false,
      disableClose: config?.disableClose,
      backdropClass: 'nv-dialog-backdrop',
      data: {
        message,
        title: title ? title : 'Mensaje del sistema',
        confirm: config?.confirm,
        type: type || "show"
      }
    });
  }

  show(mesage:string, config?:{ title?:string, disableClose?:boolean, confirm?:boolean }):MatDialogRef<MessageBox, boolean | undefined>{
    return this._open(mesage, config?.title, "show" , { disableClose: config?.disableClose, confirm: config?.confirm });
  }
  alert(mesage:string, config?:{ title?:string, disableClose?:boolean, confirm?:boolean }):MatDialogRef<MessageBox, boolean | undefined>{
    return this._open(mesage, config?.title, "alert" , {  disableClose: config?.disableClose, confirm: config?.confirm });
  }
  info(mesage:string, config?:{ title?:string, disableClose?:boolean, confirm?:boolean }):MatDialogRef<MessageBox, boolean | undefined>{
    return this._open(mesage, config?.title, "info", { disableClose: config?.disableClose, confirm: config?.confirm });
  }
  error(mesage:string, config?:{ title?:string, disableClose?:boolean, confirm?:boolean }):MatDialogRef<MessageBox, boolean | undefined>{
    return this._open(mesage, config?.title, "error", { disableClose: config?.disableClose, confirm: config?.confirm });
  }
}
