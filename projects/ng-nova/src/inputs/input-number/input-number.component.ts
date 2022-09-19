import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-input-number',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css']
})
export class InputNumber implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
