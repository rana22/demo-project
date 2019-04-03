import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {UserDAO} from "../../../../core/services/dao/userDAO";
import {ApiHelper} from "../../../../core/services/apiHelper";
import {AdminAccess} from "../../../shared/accessAdmin";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public columnDefs;
  public rowData;
  public editPath;

  constructor(
    private router: Router,
    private userDAO: UserDAO,
    private apiHelper: ApiHelper,
    private checkAdmin: AdminAccess
  ) {

    this.columnDefs = this.createColumnDefs();
    this.rowData = this.createRowData();
    this.editPath = 'portal/admin/user/edit';

    this.checkAdmin.checkAdminAccess(this.userDAO, this.apiHelper, this.router);
  }

  ngOnInit() {}

  private createColumnDefs() {
    return [
      {
        headerName: "UserName",
        field: "username",
        filter: "text"
      },
      {
        headerName: "email",
        field: "email",
        filter: "text"
      },
      {
        headerName: "First Name",
        field: "firstName",
        filter: "text"
      },
      {
        headerName: "Last Name",
        field: "lastName",
        filter: "text"
      },
      {
        headerName: "Status",
        field: "status",
        filter: "text"
      }
    ];
  }

  private createRowData() {
    return this.userDAO.get();
  }

}
