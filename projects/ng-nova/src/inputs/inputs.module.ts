import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumber } from './input-number/input-number.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputCurrency } from './input-currency/input-currency.component';
import { InputCellphone } from './input-cellphone/input-cellphone.component';
import { DOMInsertedEventsModule } from '../dom-inserted-events.module';



@NgModule({
  declarations: [
    InputNumber,
    InputCurrency,
    InputCellphone
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DOMInsertedEventsModule
  ],
  exports: [
    InputNumber,
    InputCurrency,
    InputCellphone
  ]
})
export class InputsModule { }
