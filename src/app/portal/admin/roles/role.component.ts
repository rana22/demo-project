import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {UserDAO} from "../../../../core/services/dao/userDAO";
import {ApiHelper} from "../../../../core/services/apiHelper";
import {AdminAccess} from "../../../shared/accessAdmin";
import {RoleDAO} from "../../../../core/services/dao/roleDAO";
import {ConstantMan} from "../../../../core/services/constantMan";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public columnDefs;
  public rowData;
  public editPath;

  constructor(
    private router: Router,
    private roleDAO: RoleDAO,
    private userDAO: UserDAO,
    private apiHelper: ApiHelper,
    private checkAdmin: AdminAccess
  ) {

    this.columnDefs = this.createColumnDefs();
    this.rowData = this.createRowData();
    this.editPath = 'portal/admin/role/edit';

    this.checkAdmin.checkAdminAccess(this.userDAO, this.apiHelper, this.router);

    //Added in due to all roles having GET /roles automatically
    let roles = this.userDAO.getCurrentUser().roles;
    let roleIds: number[] = [];
    roles.forEach((role) => {
      roleIds.push(role.id);
    });

    if (!this.roleDAO.canAccessItem(roleIds, ConstantMan.API.RESOURCE.ROLE)) {
      let apiError = {status: 403, url: router.url};
      apiHelper.handleApiError(apiError);
    }
  }

  ngOnInit() {}

  private createColumnDefs() {
    return [
      {
        headerName: "Name",
        field: "type",
        filter: "text"
      },
      {
        headerName: "Admin Access",
        field: "adminAccess",
        filter: "text"
      }
    ];
  }

  private createRowData() {
    return this.roleDAO.get();
  }

}
