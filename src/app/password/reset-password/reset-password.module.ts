import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from "./reset-password.component";
import { ResetPasswordRoutingModule } from "./reset-password-routing.module";
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    ResetPasswordComponent
  ],
  exports: [
    ResetPasswordComponent
  ],
  providers: []
})
export class ResetPasswordModule { }
