import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile.component";
import {ProfileResolve} from "./profile.resolve";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal/profile', component: ProfileComponent,
        resolve : {
          ProfileResolve: ProfileResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
