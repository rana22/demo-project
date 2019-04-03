import {BaseDAO} from "./baseDAO";
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantMan } from '../constantMan'
import {ApiHelper} from "../apiHelper";
import {EntityManagerFactory} from "../entityManagerFactory";
import {Sample} from "../../models/sample";
import {EntityQuery, Predicate} from "breeze-client";

@Injectable()
export class ResultDAO extends BaseDAO {


  constructor(manager:string, apiHelper: ApiHelper, entityManagerFactory : EntityManagerFactory) {
    super(manager, ConstantMan.API.RESOURCE.RESULT, '/Result', apiHelper, entityManagerFactory );
  }

  public getSamplesByJobSiteId(sampleId:number) : Sample[] {
    let query:EntityQuery = EntityQuery
      .from(this.getEtype())
      .where('jobSiteId', 'eq', sampleId);

    return this.manager.executeQueryLocally(query) as Sample[];
  }

  

}