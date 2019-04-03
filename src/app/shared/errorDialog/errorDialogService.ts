import { Observable } from 'rxjs/Rx';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';
import {ErrorDialog} from "./errorDialog";

@Injectable()
export class ErrorDialogService {

  constructor(private dialog: MdDialog) { }

  public open(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ErrorDialog>;

    dialogRef = this.dialog.open(ErrorDialog);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}
