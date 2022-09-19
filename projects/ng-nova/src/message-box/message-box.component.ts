import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBox implements OnInit {
  iconos:{[key:string]: string} = {
    'show': 'notifications',
    'alert': 'warning',
    'info': 'info',
    'error': 'error',
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) private data:MessageBoxData 
  ) { console.log(this.isConfirm) }

  get title():string {
    return this.data.title;
  }

  get message():string {
    return this.data.message;
  }

  get isConfirm():boolean {
    return this.data.confirm || false;
  }

  get icon():string {
    return this.iconos[this.data.type];
  }

  ngOnInit(): void {
  }

}


export interface MessageBoxData {
  message:string,
  title:string,
  confirm?:boolean,
  type:MessageBoxType
}

export type MessageBoxType = 'show' | 'alert' | 'info' | 'error'