import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import { QueryResult } from 'breeze-client';
import {Observable} from "rxjs";
import {AuthService} from "../../../core/services/auth.service";

@Injectable()
export class ProfileResolve implements Resolve<QueryResult> {
  constructor(
    private authService: AuthService
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    let sessionResolve = this.authService.checkSession();

    return Observable.merge(sessionResolve);
  }
}
