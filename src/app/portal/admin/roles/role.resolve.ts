import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { QueryResult } from 'breeze-client';
import {Observable} from "rxjs";
import {RoleDAO} from "../../../../core/services/dao/roleDAO";
import {AuthService} from "../../../../core/services/auth.service";
import {PermissionDAO} from "../../../../core/services/dao/permissionDAO";

@Injectable()
export class RoleResolve implements Resolve<QueryResult> {
  constructor(
    private authService: AuthService,
    private roleDAO: RoleDAO,
    private permissionDAO: PermissionDAO
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    let sessionResolve = this.authService.checkSession();
    let roleResolve = this.roleDAO.load();
    let permissionResolve = this.permissionDAO.load();

    return Observable.merge(sessionResolve,roleResolve,permissionResolve);
  }
}
