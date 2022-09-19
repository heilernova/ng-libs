import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MessageBoxModule } from 'ng-nova';
import { MessageBoxModule } from 'projects/ng-nova/src/public-api';
import { MatButtonModule } from '@angular/material/button';
import { InputsComponent } from './inputs/inputs.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MessageBoxModule,
    MatButtonModule,
    InputsComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
