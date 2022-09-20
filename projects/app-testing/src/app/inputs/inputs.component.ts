import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { InputsModule } from 'ng-nova';
import { InputNumber, InputsModule, MessageBoxModule } from 'projects/ng-nova/src/public-api';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inputs',
  standalone: true,
  imports: [CommonModule, InputsModule, MatInputModule,ReactiveFormsModule, MessageBoxModule ],
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {

  form = new FormGroup({
    number: new FormControl(null),
    decimal: new FormControl(null)
  })
  constructor() { }

  ngOnInit(): void {
  }

  send(): void {
    console.log(this.form.getRawValue());
  }

}
