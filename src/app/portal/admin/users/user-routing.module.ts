import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import {UserResolve} from "./user.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/admin/users', component: UserComponent,
        resolve : {
          users : UserResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
