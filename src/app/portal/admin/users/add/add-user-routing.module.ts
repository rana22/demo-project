import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user.component';
import {UserResolve} from "../user.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/users/add', component: AddUserComponent,
        resolve : {
          users : UserResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AddUserRoutingModule { }
