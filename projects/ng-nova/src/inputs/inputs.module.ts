import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber } from './input-number/input-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCurrency } from './input-currency/input-currency.component';
import { InputCellphone } from './input-cellphone/input-cellphone.component';



@NgModule({
  declarations: [
    InputNumber,
    InputCurrency,
    InputCellphone
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputNumber,
    InputCurrency,
    InputCellphone
  ]
})
export class InputsModule { }
