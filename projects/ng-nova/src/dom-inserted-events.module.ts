import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Platform } from '@angular/cdk/platform';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class DOMInsertedEventsModule { 

  constructor(
    private platfomr:Platform
  ){
    document.body.addEventListener("DOMNodeInserted", (e) => {

      let element = e.target;
          
      if (element instanceof HTMLElement){

        if (element.classList.contains('cdk-overlay-backdrop')){
          console.log('Event')
          element.addEventListener("contextmenu", (e) => {
            e.stopPropagation();
            e.preventDefault();
            (e.target as HTMLDivElement).click();
          });
        }
      }

      if (element instanceof HTMLInputElement){
        this.inputEvents(element);
      }


    });


  }
  inputEvents(input:HTMLInputElement): void {
    if (input.classList.contains('number')){

      input.inputMode = "numeric";
      if (input.classList.contains('decimal')){
        input.inputMode = "decimal";
      }
      input.autocomplete = "off"

      input.addEventListener("paste", ev => {
        ev.preventDefault();
      })

      input.addEventListener("keydown", ev => {
        if (ev.key == "Backspace"){
          (ev.target as HTMLInputElement).selectionStart = (ev.target as HTMLInputElement).value.length;
        }
      });

      if (this.platfomr.ANDROID){

        input.addEventListener("keypress", ev => {
          if (!ev.key.match(/[0-9]/)){
            ev.preventDefault();
          }
        });

        // Parar la plataforma android utilizamore le keyup ya que falla keydowm
        if (!input.classList.contains('nv-input-currency')){
          input.addEventListener("keyup", ev => {
            let text = (ev.target as HTMLInputElement).value;
  
            if (!text.match(/[0-9]$/g)){
              (ev.target as HTMLInputElement).value = text.substring(0, text.length - 1);
            }
            
          });
        }

      }else{

        input.addEventListener("keypress", ev => {
          if (!ev.key.match(/[0-9]/)){
            ev.preventDefault();
          }
        })

      }

      // element.addEventListener("keydown", ev => {
      //   if (ev.key == "Backspace"){
      //     (ev.target as HTMLInputElement).selectionStart = (ev.target as HTMLInputElement).value.length;
      //   }
      // })

      // element.addEventListener("keypress", ev => {
      //   if (!ev.key.match(/[0-9]/)){
      //     ev.preventDefault();
      //   }
      // });

      // element.addEventListener("keyup", ev => {
      //   let text:string = (ev.target as HTMLInputElement).value;
      //   let ocu = [];
      //   let  ocurrencias = text.matchAll(/[0-9, \.]/g)
      //   for (const ocurrencia of ocurrencias){
      //     ocu.push(ocurrencia[0]);
      //   }

      //   text = "";
      //   ocu.forEach(t => text += t);

      //   (ev.target as HTMLInputElement).value = text;

      // });

    }

  }
}
