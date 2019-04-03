import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordComponent } from "./forgot-password.component";
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    ForgotPasswordComponent
  ],
  exports: [
    ForgotPasswordComponent
  ],
  providers: []
})

export class ForgotPasswordModule { }
