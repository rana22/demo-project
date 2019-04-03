/**
 * Created by jdickman on 4/19/17.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RemoveInactivesPipe} from "./removeInactivePipe/removeInactive.pipe";

@NgModule({
  declarations:[RemoveInactivesPipe],
  imports:[CommonModule],
  exports:[RemoveInactivesPipe]
})

export class MainPipe{}
