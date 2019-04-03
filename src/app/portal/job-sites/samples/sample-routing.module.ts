import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SampleComponent} from "./sample.component";
import {SampleResolve} from "./sample.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/job-site/:id/samples', component: SampleComponent,
        resolve : {
          SampleResolve: SampleResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class SampleRoutingModule { }
