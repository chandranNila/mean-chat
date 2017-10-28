import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {SharedComponent} from './shared.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { FileSelectDirective } from 'ng2-file-upload';
@NgModule({
  imports: [ RouterModule, CommonModule, BrowserModule, FormsModule],
  declarations: [ SharedComponent , FileSelectDirective],
  exports: [ SharedComponent ]
})

export class SharedModule {}
