import {BaseDAO} from "./baseDAO";
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantMan } from '../constantMan'
import {ApiHelper} from "../apiHelper";
import {EntityManagerFactory} from "../entityManagerFactory";
import {JobSite} from "../../models/jobSite";
import {EntityQuery, Predicate} from "breeze-client";

@Injectable()
export class JobSiteDAO extends BaseDAO {


  constructor(manager:string, apiHelper: ApiHelper, entityManagerFactory : EntityManagerFactory) {
    super(manager, ConstantMan.API.RESOURCE.JOB_SITE, 'JobSite', apiHelper, entityManagerFactory );
  }

}
