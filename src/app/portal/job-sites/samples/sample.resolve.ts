import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NgModule, Injectable } from '@angular/core';
import { QueryResult } from 'breeze-client';
import {SampleDAO} from "../../../../core/services/dao/sampleDAO";

import {Observable} from "rxjs";

@Injectable()
export class SampleResolve implements Resolve<QueryResult> {
  constructor(
    private sampleDAO: SampleDAO
  ) {}

  resolve(route: ActivatedRouteSnapshot) {

    let sampleResolve = this.sampleDAO.load();

    return Observable.merge(sampleResolve);
  }
}
