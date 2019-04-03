import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserDAO} from "../../../../../core/services/dao/userDAO";
import {Role} from "../../../../../core/models/role";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  model: any = {};
  userRoles:Role[] = [];

  constructor(
    private router: Router,
    private userDAO : UserDAO) {}

  ngOnInit() {}

  onSubmitted(userForm:any) {
    let user = userForm.user;
    let roles = userForm.roles;

    let ctrl = this;
    this.userDAO.createUser(user, roles).subscribe(
      result => {
        ctrl.router.navigate(['portal/admin/users']);
      },
      error => {
        console.error(error);
      }
    );
  }

  onCancelled() {
    this.router.navigate(['portal/admin/users']);
  }

}
