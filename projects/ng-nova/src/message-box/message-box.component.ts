import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss']
})
export class MessageBox implements OnInit {
  title:string = "Mensaje del sistema";
  constructor() { }

  ngOnInit(): void {
  }

}
