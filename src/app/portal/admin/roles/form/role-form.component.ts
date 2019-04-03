import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {UserDAO} from "../../../../../core/services/dao/userDAO";
import {Role} from "../../../../../core/models/role";
import {ApiHelper} from "../../../../../core/services/apiHelper";
import {Router} from "@angular/router";
import {AdminAccess} from "../../../../shared/accessAdmin";
import {PermissionDAO} from "../../../../../core/services/dao/permissionDAO";
import {ErrorDialogService} from "../../../../shared/errorDialog/errorDialogService";

@Component({
  selector: 'tdk-role-form',
  templateUrl: './role-form.component.html'
})
export class RoleFormComponent implements OnInit {

  @Input()
  role: Role;

  @Input()
  rolePermissions: any[];

  @Output() onCancelled = new EventEmitter<boolean>();
  @Output() onSubmitted = new EventEmitter<any>();

  public model: Role;
  public permissionList: any[];

  constructor(
    private permissionDAO: PermissionDAO,
    private userDAO: UserDAO,
    private apiHelper: ApiHelper,
    private router: Router,
    private adminCheck: AdminAccess,
    private permissionDialog: ErrorDialogService) {

    this.adminCheck.checkAdminAccess(this.userDAO, this.apiHelper, this.router);
    this.permissionList = this.permissionDAO.getEditablePermissions() as any[];
    this.permissionList.forEach(function(permission) {
      permission.isChecked = false;
    });
  }

  ngOnInit() {
    this.model = this.role;

    if (this.rolePermissions) {
      for (let permission of this.permissionList) {
        for (let rolePermission of this.rolePermissions) {
          if (permission.id == rolePermission.permissionId) {
            permission.isChecked = true;
            break;
          }
        }
      }
    }

  }

  cancel() {
    this.onCancelled.emit(true);
  }

  onSubmit() {
    let permissions: number[] = [];
    this.permissionList.forEach(function(permission) {
      if (permission.isChecked) {
        permissions.push(permission.id);
      }
    });

    let roleForm = {
      role : this.role,
      permissions : permissions
    };

    this.onSubmitted.emit(roleForm);
  }

  viewPermission(permission) {
    this.permissionDialog.open(permission.title, permission.description);
  }

}
