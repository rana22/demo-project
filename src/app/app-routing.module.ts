/**
 * Created by jdickman on 3/13/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {PortalResolve} from "./portal/portal.resolve";

@NgModule({
  imports: [
    RouterModule.forRoot([
      /* define app module routes here, e.g., to lazily load a module
       (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
      {
        path: '',
        redirectTo: "/login",
        pathMatch: 'full',
        resolve: {
          portal: PortalResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

