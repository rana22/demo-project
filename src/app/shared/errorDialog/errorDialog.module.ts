import { ErrorDialogService } from './errorDialogService';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {ErrorDialog} from "./errorDialog";


@NgModule({
  imports: [
    MaterialModule,
  ],
  exports: [
    ErrorDialog,
  ],
  declarations: [
    ErrorDialog,
  ],
  providers: [
    ErrorDialogService,
  ],
  entryComponents: [
    ErrorDialog,
  ],
})
export class ErrorDialogModule { }
