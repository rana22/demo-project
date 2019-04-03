import {Component} from "@angular/core";
import {AgRendererComponent} from "ag-grid-angular";

@Component({
  selector: 'edit-button',
  styleUrls: ['./editButton.component.css'],
  template: `<button md-raised-button type="button" (click)="invokeEdit()" color="primary" class="md-button md-small">
        Edit <md-icon>create</md-icon>
        </button>`
})
export class EditButtonComponent implements AgRendererComponent {
  private params:any;

  agInit(params:any):void {
    this.params = params;
  }

  public invokeEdit(e) {
    this.params.context.componentParent.onActionViewClick(this.params.data);
  }

}
