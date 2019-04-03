import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MaterialModule} from '@angular/material';
import {TextMaskModule} from "angular2-text-mask";
import {RoleFormComponent} from "./role-form.component";
import {SharedModule} from "../../../../shared/shared.module";
import {AdminAccess} from "../../../../shared/accessAdmin";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    TextMaskModule,
    FlexLayoutModule
  ],
  declarations: [
    RoleFormComponent
  ],
  exports: [
    RoleFormComponent
  ],
  providers: [
    AdminAccess
  ]
})
export class RoleFormModule { }
