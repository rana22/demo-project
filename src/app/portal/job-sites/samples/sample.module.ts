import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {SharedModule} from "../../../shared/shared.module";
import {SampleRoutingModule} from "./sample-routing.module";
import {SampleComponent} from "./sample.component";
import {SampleResolve} from "./sample.resolve";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    SampleRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    SampleComponent
  ],
  exports: [
    SampleComponent
  ],
  providers: [
    SampleResolve
  ]
})
export class SampleModule { }
