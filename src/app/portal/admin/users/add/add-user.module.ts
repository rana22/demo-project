import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {UserFormModule} from "../form/user-form.module";
import {AddUserRoutingModule} from "./add-user-routing.module";
import {AddUserComponent} from "./add-user.component";

@NgModule({
  imports: [
    CommonModule,
    AddUserRoutingModule,
    FormsModule,
    MaterialModule,
    UserFormModule
  ],
  declarations: [
    AddUserComponent
  ],
  exports: [
    AddUserComponent
  ],
  providers: []
})
export class AddUserModule { }
