import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoleDAO} from "../../../../../core/services/dao/roleDAO";
import {ConstantMan} from "../../../../../core/services/constantMan";

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {

  public model: any = {};
  public rolePermissions: number[] = [];

  constructor(
    private router: Router,
    private roleDAO : RoleDAO) {}

  ngOnInit() {
    this.model.adminAccess = false;
  }

  onSubmitted(roleForm:any) {
    let role = roleForm.role;
    let permissions = ConstantMan.DEFAULT_PERMISSIONS.concat(roleForm.permissions);

    let ctrl = this;
    this.roleDAO.createRole(role, permissions).subscribe(
      result => {
        ctrl.router.navigate(['portal/admin/roles']);
      },
      error => {
        console.error(error);
      }
    );
  }

  onCancelled() {
    this.router.navigate(['portal/admin/roles']);
  }

}
