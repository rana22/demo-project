import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {ChipsInputComponent} from "./chipsInput.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AutoCompleteModule} from "../autoComplete/autoComplete.module";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteModule
  ],
  exports: [
    ChipsInputComponent,
  ],
  declarations: [
    ChipsInputComponent,
  ],
  providers: [
  ]
})
export class ChipsInputModule { }
