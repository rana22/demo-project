import { Component, OnInit } from '@angular/core';
import {UserDAO} from "../../core/services/dao/userDAO";

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {

  canAccessAdmin: boolean = false;

  constructor(
    private userDAO: UserDAO
  ) {
    let currentUser = this.userDAO.getCurrentUser();

    for (let role of currentUser.roles) {
      if (role.adminAccess) {
        this.canAccessAdmin = true;
        break;
      }
    }
  }

  ngOnInit() {

  }

}
