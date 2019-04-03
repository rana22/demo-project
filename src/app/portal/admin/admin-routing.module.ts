import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminResolve} from "./admin.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin', component: AdminComponent,
        resolve: {
          user: AdminResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
