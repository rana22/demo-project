import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PortalRoutingModule} from "./portal-routing.module";
import {PortalComponent} from "./portal.component";
import {MaterialModule} from '@angular/material';
import {AdminModule} from "./admin/admin.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {SharedModule} from "../shared/shared.module";
import {PortalResolve} from "./portal.resolve";
import {ProfileModule} from "./profile/profile.module";
import {JobSiteModule} from "./job-sites/job-site.module";
import {SampleModule} from "./job-sites/samples/sample.module";


@NgModule({
  imports: [
    CommonModule,
    PortalRoutingModule,
    MaterialModule,
    AdminModule,
    FlexLayoutModule,
    SharedModule,
    ProfileModule,
    JobSiteModule,
    SampleModule
  ],
  declarations: [
    PortalComponent
  ],
  exports: [
    PortalComponent
  ],
  providers: [
    PortalResolve
  ]
})
export class PortalModule { }
