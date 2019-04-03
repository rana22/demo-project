import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {EditUserComponent} from "./edit-user.component";
import {UserResolve} from "../user.resolve";


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/user/edit/:id', component: EditUserComponent,
        resolve : {
          users : UserResolve
        }
      }
    ])
  ],
  exports: [RouterModule],
})
export class EditUserRoutingModule { }
