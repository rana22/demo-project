import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EditRoleComponent} from "./edit-role.component";
import {RoleResolve} from "../role.resolve";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/role/edit/:id', component: EditRoleComponent,
        resolve : {
          roles : RoleResolve
        }
      }
    ])
  ],
  exports: [RouterModule],
})
export class EditRoleRoutingModule { }
