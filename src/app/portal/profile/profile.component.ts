import {Component, OnInit, EventEmitter, Output, Input} from '@angular/core';
import {User} from "../../../core/models/user";
import {UserDAO} from "../../../core/services/dao/userDAO";
import {Role} from "../../../core/models/role";
import {Router} from "@angular/router";

@Component({
  selector: 'tdk-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public model: User;
  public currentUser: User;
  public userRoles: number[] = [];

  constructor(
    private userDAO: UserDAO, private router: Router) {

    this.currentUser = this.userDAO.getCurrentUser();
  }

  ngOnInit() {
    this.model = this.currentUser;
  }

  updateProfile() {
    this.model.roles.forEach((role:Role, index:number) => {
      this.userRoles.push(role.id);
    });

    let user = this.model;
    let roles = this.userRoles;

    let ctrl = this;
    this.userDAO.updateUser(user, roles).subscribe(
      data => {
        ctrl.router.navigate(['portal']);
      },
      error => {
        console.error(error);
      }
    );
  }

  cancel() {
    this.router.navigate(['portal']);
  }

}
