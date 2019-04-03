import {Component} from "@angular/core";
import {MdDialogRef} from "@angular/material";
/**
 * Created by jdickman on 3/22/17.
 */
@Component({
  selector: 'error-dialog',
  templateUrl: './error-dialog.component.html',
})
export class ErrorDialog {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ErrorDialog>) {}
}
