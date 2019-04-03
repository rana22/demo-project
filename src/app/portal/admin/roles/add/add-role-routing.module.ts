import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddRoleComponent } from './add-role.component';
import {RoleResolve} from "../role.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/roles/add', component: AddRoleComponent,
        resolve : {
          roles : RoleResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddRoleRoutingModule { }
