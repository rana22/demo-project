import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoleDAO} from "../../../core/services/dao/roleDAO";
import {UserDAO} from "../../../core/services/dao/userDAO";
import {ApiHelper} from "../../../core/services/apiHelper";
import {AdminAccess} from "../../shared/accessAdmin";
import {ConstantMan} from "../../../core/services/constantMan";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

  public accessRoles: boolean;
  public accessUsers: boolean;

  constructor(
    private router: Router,
    private roleDAO: RoleDAO,
    private userDAO: UserDAO,
    private apiHelper: ApiHelper,
    private checkAdmin: AdminAccess) {

    this.checkAdmin.checkAdminAccess(this.userDAO, this.apiHelper, this.router);
  }

  ngOnInit() {
    let roles = this.userDAO.getCurrentUser().roles;
    let roleIds: number[] = [];
    roles.forEach((role) => {
      roleIds.push(role.id);
    });

    this.accessRoles = this.roleDAO.canAccessItem(roleIds, ConstantMan.API.RESOURCE.ROLE);
    this.accessUsers = this.roleDAO.canAccessItem(roleIds, ConstantMan.API.RESOURCE.USER);
  }

}
