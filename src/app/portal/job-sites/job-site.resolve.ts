import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import { QueryResult } from 'breeze-client';
import {JobSiteDAO} from "../../../core/services/dao/jobSiteDAO";

import {Observable} from "rxjs";

@Injectable()
export class JobSiteResolve implements Resolve<QueryResult> {
  constructor(
    private jobSiteDAO: JobSiteDAO
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    let jobSiteResolve = this.jobSiteDAO.load();

    return Observable.merge(jobSiteResolve);
  }
}
