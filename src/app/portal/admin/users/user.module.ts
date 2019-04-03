import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {UserResolve} from "./user.resolve";
import {AgGridModule} from "ag-grid-angular";
import {EditUserModule} from "./edit/edit-user.module";
import {AddUserModule} from "./add/add-user.module";
import {SharedModule} from "../../../shared/shared.module";
import {ListGridComponent} from "../../../shared/listGrid/listGrid.component";

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    AgGridModule.withComponents([
      ListGridComponent
    ]),
    AddUserModule,
    EditUserModule
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [
    UserResolve
  ]
})
export class UserModule { }

