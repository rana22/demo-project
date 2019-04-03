import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {MaterialModule} from "@angular/material";
import {AdminComponent} from "./admin.component";
import {UserModule} from "./users/user.module";
import {RoleModule} from "./roles/role.module";
import {SharedModule} from "../../shared/shared.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AdminResolve} from "./admin.resolve";

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    UserModule,
    RoleModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    AdminComponent
  ],
  exports: [
    AdminComponent
  ],
  providers: [
    AdminResolve
  ]
})
export class AdminModule { }
