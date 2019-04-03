import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from "./role.component";
import { RoleRoutingModule } from "./role-routing.module";
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {RoleResolve} from "./role.resolve";
import {AgGridModule} from "ag-grid-angular";
import {EditRoleModule} from "./edit/edit-role.module";
import {AddRoleModule} from "./add/add-role.module";
import {SharedModule} from "../../../shared/shared.module";
import {ListGridComponent} from "../../../shared/listGrid/listGrid.component";

@NgModule({
  imports: [
    CommonModule,
    RoleRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AgGridModule.withComponents([
      ListGridComponent
    ]),
    AddRoleModule,
    EditRoleModule
  ],
  declarations: [
    RoleComponent
  ],
  exports: [
    RoleComponent
  ],
  providers: [
    RoleResolve
  ]
})
export class RoleModule { }

