import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataComponent } from './components/data/data.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [DataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    DataComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule { }
