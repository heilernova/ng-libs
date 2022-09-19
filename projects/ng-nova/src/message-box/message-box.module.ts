import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageBox } from './message-box.component';
import { MatDialogModule } from '@angular/material/dialog';
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
export class MessageBoxModule { }
