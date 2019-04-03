import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import {MaterialModule} from '@angular/material';
import {SharedModule} from "../../shared/shared.module";
import {JobSiteRoutingModule} from "./job-site-routing.module";
import {JobSiteComponent} from "./job-site.component";
import {JobSiteResolve} from "./job-site.resolve";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  imports: [
    CommonModule,
    JobSiteRoutingModule,
    FormsModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule
  ],
  declarations: [
    JobSiteComponent
  ],
  exports: [
    JobSiteComponent
  ],
  providers: [
    JobSiteResolve
  ]
})
export class JobSiteModule { }
