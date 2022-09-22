import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MessageBoxModule } from 'ng-nova';
import { DOMInsertedEventsModule, MessageBoxModule } from 'projects/ng-nova/src/public-api';
import { MatButtonModule } from '@angular/material/button';
import { InputsComponent } from './inputs/inputs.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatContextMenuTrigger } from './contenxt-menu';

@NgModule({
  declarations: [
    AppComponent,
    MatContextMenuTrigger
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MessageBoxModule,
    MatButtonModule,
    InputsComponent,
    MatMenuModule,
    DOMInsertedEventsModule
  ],
  providers: [
    // MatContextMenuTrigger
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
