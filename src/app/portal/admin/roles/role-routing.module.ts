import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RoleComponent } from './role.component';
import {RoleResolve} from "./role.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/roles', component: RoleComponent,
        resolve : {
          roles : RoleResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
