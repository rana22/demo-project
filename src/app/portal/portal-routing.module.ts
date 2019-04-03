import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { PortalResolve } from './portal.resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'portal', component: PortalComponent,
        resolve : {
          portal: PortalResolve
        }
      }
    ])
  ],
  exports: [RouterModule]
})
export class PortalRoutingModule { }
