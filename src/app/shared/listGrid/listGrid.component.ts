import {GridOptions, ColGroupDef, ColDef, RowNode} from "ag-grid";
import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EditButtonComponent} from "./editButton/editButton.component";
import {MaterialModule} from '@angular/material';
import {ObservableMedia, MediaChange} from "@angular/flex-layout";
import {Subscription} from "rxjs";
import {ConstantMan} from "../../../core/services/constantMan";

@Component({
  selector: 'list-grid',
  templateUrl: './listGrid.component.html',
  styleUrls: ['./listGrid.component.css'],

})
export class ListGridComponent implements OnInit {

  private activeMediaQuery = "";
  private watcher: Subscription;
  public gridOptions: GridOptions;
  @Input()
  columnDefs : (ColDef | ColGroupDef)[];
  @Input()
  rowData : any[];
  @Input()
  editPath: string;
  @Input()
  externalFilterFunc: (node: RowNode) => boolean;
  @Input()
  allowExport: boolean;
  @Input()
  exportParams: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public media: ObservableMedia
  ) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      this.resizeGrid();
    });

  }

  resizeGrid() {
    if (this.gridOptions) {
      this.gridOptions.api.sizeColumnsToFit();//attempt resize at media breakpoints
    }
  }

  ngOnInit() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.rowHeight = 48;
    this.gridOptions.groupSuppressAutoColumn = true;
    this.gridOptions.enableSorting = true;

    /* set minimum column widths if not defined */
    this.columnDefs.forEach(function (columnDef: ColDef) {
      if(!columnDef.minWidth){
        columnDef.minWidth = 120;
      }
    });

    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.columnDefs.push({
      headerName:"Actions",
      suppressMenu: true,
      cellRendererFramework: EditButtonComponent,
      suppressSizeToFit: true,
      width: 100
    });
    this.gridOptions.rowData = this.rowData;
    this.gridOptions.enableFilter = true;

    this.gridOptions.onGridReady = () => {
      this.gridOptions.api.sizeColumnsToFit();
      if(this.externalFilterFunc){//if filter func is defined
        this.gridOptions.isExternalFilterPresent = this.useExternalFilter;//set use external filter to true
        this.gridOptions.doesExternalFilterPass = this.externalFilterFunc;//assign filter function
      }
      this.gridOptions.api.onFilterChanged();//filter grid
    };
    this.gridOptions.icons = {
      checkboxChecked: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMTQzMkY1NDIyMjhFNjExQkVGOEFCQUI5MzdBNjFEMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyMzBBQkU2ODI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyMzBBQkU2NzI4MjQxMUU2QjlDRUZCNUFDREJGRTVDMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjE0NDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjExNDMyRjU0MjIyOEU2MTFCRUY4QUJBQjkzN0E2MUQxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+O+zv0gAAAQ1JREFUeNpilJvw35OBgWEuEEsyEAeeA3EyI1DjMxI0wTUzkaEJBCSZiFVpJcvAsDqEgUFVCMInSqOeOAPDLG8GBjNpBoZCCyI1KggwMCzwZ2DgZWdgOPWUgaF4F5pGDxWgqT4MDPzsSB7hYWBYHMDAIMzJwHDjDQND0mYGhu9/0DT6qTEwuCszMOyIZmAwkoTYALJJjp+B4cEHBoaEjQwMn38iDAVFx38wA4gzTBgYSiwhEi++MDDI8DEwvP3OwBC0CqIZGcBtBOmefoaBIXQNA8PvfxBNf4B03AZMTVgD5xwwXcQDFX/8wcAw+RQDw5VX2AMN7lRSARM07ZEKXoA0poAYJGh6CkrkAAEGAKNeQxaS7i+xAAAAAElFTkSuQmCC"/>'
    };
    this.gridOptions.context = {
      componentParent: this
    };
    this.gridOptions.enableColResize = true;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  public onActionViewClick(data: any){
    let path = this.editPath;
    console.log(path);
    this.router.navigate([path, data.id]);
  }

  private useExternalFilter(){
    return true;
  }

  public onActionRemoveClick(data: any){
    console.log("Remove action clicked", data);
  }

  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public exportToCSV() {
    this.gridOptions.api.exportDataAsCsv(this.exportParams);
  }

}
