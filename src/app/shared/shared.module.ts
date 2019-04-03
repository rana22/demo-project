import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {AgGridModule} from "ag-grid-angular";
import {ListGridComponent} from "./listGrid/listGrid.component";
import {AutoCompleteModule} from "./autoComplete/autoComplete.module";
import {MaterialModule} from "@angular/material";
import {EditButtonComponent} from "./listGrid/editButton/editButton.component";
import {ChipsInputModule} from "./chipsInput/chipsInput.module";
import {MainPipe} from "./pipes/pipes.module";
import {PortalLinkTileModule} from "./portalLinkTile/portalLinkTile.module";

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AgGridModule.withComponents([
      ListGridComponent,
      EditButtonComponent
    ]),
    AutoCompleteModule,
    ChipsInputModule,
    MainPipe
  ],
  declarations: [
    EditButtonComponent,
    ListGridComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AutoCompleteModule,
    ListGridComponent,
    ChipsInputModule,
    MainPipe,
    PortalLinkTileModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
