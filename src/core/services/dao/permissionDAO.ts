import {BaseDAO} from "./baseDAO";
import { Injectable } from '@angular/core';
import { ConstantMan } from '../constantMan'
import {ApiHelper} from "../apiHelper";
import {EntityQuery, Predicate} from 'breeze-client';
import {EntityManagerFactory} from "../entityManagerFactory";
import {Permission} from "../../models/permission";

@Injectable()
export class PermissionDAO extends BaseDAO {

  constructor(manager:string, apiHelper: ApiHelper, entityManagerFactory : EntityManagerFactory) {
    super(manager, ConstantMan.API.RESOURCE.PERMISSION, 'Permission', apiHelper, entityManagerFactory );
  }

  public getEditablePermissions() : Permission[] {
    let predicate: Predicate = new Predicate("id", "in", ConstantMan.DEFAULT_PERMISSIONS).not();

    let query:EntityQuery = EntityQuery
      .from(this.getEtype())
      .where(predicate);

    return this.manager.executeQueryLocally(query) as Permission[];
  }

}
