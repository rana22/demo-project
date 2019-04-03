import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {User} from "../../../../../core/models/user";
import {UserDAO} from "../../../../../core/services/dao/userDAO";
import {ConstantMan} from "../../../../../core/services/constantMan";
import {RoleDAO} from "../../../../../core/services/dao/roleDAO";
import {Role} from "../../../../../core/models/role";
import {ApiHelper} from "../../../../../core/services/apiHelper";
import {Router} from "@angular/router";
import {AdminAccess} from "../../../../shared/accessAdmin";

@Component({
  selector: 'tdk-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  newUsername: boolean;

  @Input()
  newPassword: boolean;

  @Input()
  userRoles: Role[];

  @Output() onCancelled = new EventEmitter<boolean>();
  @Output() onSubmitted = new EventEmitter<any>();

  public model: User;
  public userStatus: string[] = [];
  public roles: Role[];

  constructor(
    private userDAO: UserDAO, private roleDAO: RoleDAO, private apiHelper: ApiHelper, private router: Router, private adminCheck: AdminAccess) {
    for(status in ConstantMan.STATUS_TYPE) {
      this.userStatus.push(ConstantMan.STATUS_TYPE[status])
    }

    this.adminCheck.checkAdminAccess(this.userDAO, this.apiHelper, this.router);
  }

  ngOnInit() {
    this.model = this.user;
    this.roles = (this.userRoles.length > 0)? this.roleDAO.getAllRolesNotAssociatedToUserId(this.user.id) : this.roleDAO.get() as Role[];
  }

  cancel() {
    this.onCancelled.emit(true);
  }

  validForm(currentlyValid:boolean) {
    if(!currentlyValid && this.userRoles.length == 0) {
      return false;
    }
    return true;
  }

  onSubmit() {
    let userRoles:number[] = [];

    this.userRoles.forEach((model:Role, index:number)=>{
      userRoles.push(model.id);
    });

    let userForm = {
      user : this.model,
      roles : userRoles,
    };

    this.onSubmitted.emit(userForm);
  }

}
