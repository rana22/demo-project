import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {EditUserComponent} from "./edit-user.component";
import {EditUserRoutingModule} from "./edit-user-routing.module";
import {UserFormModule} from "../form/user-form.module";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    EditUserRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    UserFormModule
  ],
  declarations: [
    EditUserComponent
  ],
  exports: [
    EditUserComponent
  ],
  providers: [
  ]
})
export class EditUserModule { }
