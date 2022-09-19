import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBox } from './message-box.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    MessageBox
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class MessageBoxModule {
  static scriptLoad:boolean = false;
  constructor(
    matDialog:MatDialog
  ){
    
    matDialog.afterOpened.subscribe(val => {
      console.log(val.id);

      if (val.disableClose){

        val.backdropClick().subscribe(e => {

          let co = controls.get(val.id);
          if (!co){
            val.addPanelClass('nv-dialog-disable-close');
            let setTime = setTimeout(() => {
              val.removePanelClass('nv-dialog-disable-close')
              controls.delete(val.id);
            }, 500);
  
            controls.set(val.id, setTime);
          }
          

          
        })
      }
      
    })

    // let d = matDialog.afterOpened.complete()

    document.body.addEventListener("DOMNodeInserted", (e) => {
      let element = e.target;
      if (element instanceof HTMLElement){
        if (element.classList.contains('nv-dialog-backdrop')){
          element.addEventListener("contextmenu", (e) => {
            e.stopPropagation();
            e.preventDefault();
            (e.target as HTMLDivElement).click();
          });
        }
      }
    });
  }
}

const controls = new Map<string, any>();
