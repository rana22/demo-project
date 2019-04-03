import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {SharedModule} from "../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {ProfileResolve} from "./profile.resolve";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    ProfileComponent
  ],
  exports: [
    ProfileComponent
  ],
  providers: [
    ProfileResolve
  ]
})
export class ProfileModule { }
