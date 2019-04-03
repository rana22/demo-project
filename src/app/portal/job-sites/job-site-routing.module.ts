import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {JobSiteComponent} from "./job-site.component";
import {JobSiteResolve} from "./job-site.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/job-sites', component: JobSiteComponent,
        resolve : {
          JobSiteResolve: JobSiteResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class JobSiteRoutingModule { }
