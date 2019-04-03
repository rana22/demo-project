import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {RoleFormModule} from "../form/role-form.module";
import {AddRoleRoutingModule} from "./add-role-routing.module";
import {AddRoleComponent} from "./add-role.component";

@NgModule({
  imports: [
    CommonModule,
    AddRoleRoutingModule,
    FormsModule,
    MaterialModule,
    RoleFormModule
  ],
  declarations: [
    AddRoleComponent
  ],
  exports: [
    AddRoleComponent
  ],
  providers: []
})
export class AddRoleModule { }
