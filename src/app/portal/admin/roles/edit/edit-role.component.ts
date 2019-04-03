import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {RoleDAO} from "../../../../../core/services/dao/roleDAO";
import {Role} from "../../../../../core/models/role";
import {Permission} from "../../../../../core/models/permission";
import {ConstantMan} from "../../../../../core/services/constantMan";

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
})
export class EditRoleComponent implements OnInit {

  public model: Role;
  public selectedId : any;
  public rolePermissions: Permission[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roleDAO: RoleDAO) {

  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.selectedId = +params['id'];
      this.model = this.roleDAO.getById(this.selectedId) as Role;
      this.rolePermissions = this.model["rolePermissionMap"];
    });

  }

  onSubmitted(roleForm: any) {
    let role = roleForm.role;
    let permissions = ConstantMan.DEFAULT_PERMISSIONS.concat(roleForm.permissions);

    let ctrl = this;
    this.roleDAO.updateRole(role, permissions).subscribe(
      result => {
        ctrl.router.navigate(['portal/admin/roles'])
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
