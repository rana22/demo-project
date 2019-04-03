import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { QueryResult } from 'breeze-client';
import {Observable} from "rxjs";
import {UserDAO} from "../../../../core/services/dao/userDAO";
import {RoleDAO} from "../../../../core/services/dao/roleDAO";
import {AuthService} from "../../../../core/services/auth.service";

@Injectable()
export class UserResolve implements Resolve<QueryResult> {
  constructor(
    private userDAO: UserDAO,
    private roleDAO: RoleDAO,
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    let userResolve = this.userDAO.load();
    let roleResolve = this.roleDAO.load();
    let sessionResolve = this.authService.checkSession();

    return Observable.merge(userResolve,roleResolve,sessionResolve);
  }
}
