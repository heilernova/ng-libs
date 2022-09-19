import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber } from './input-number/input-number.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    InputNumber
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputNumber
  ]
})
export class InputsModule { }
