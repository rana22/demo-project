import {BaseDAO} from "./baseDAO";
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantMan } from '../constantMan'
import {ApiHelper} from "../apiHelper";
import {Entity, EntityQuery, QueryResult, EntityState, Predicate, QueryOptions} from 'breeze-client';
import {EntityManagerFactory} from "../entityManagerFactory";
import {Role} from "../../models/role";

@Injectable()
export class RoleDAO extends BaseDAO {

  constructor(manager:string, apiHelper: ApiHelper, entityManagerFactory : EntityManagerFactory) {
    super(manager, ConstantMan.API.RESOURCE.ROLE, 'Role', apiHelper, entityManagerFactory );
  }

  public getAllRolesForUserId(userId:number) : Role[] {
    let predicate:Predicate = Predicate.create("userRoleMap", "any", "userId", "==", userId);
    let query:EntityQuery = EntityQuery
      .from(this.getEtype())
      .where(predicate)
      .expand("userRoleMap");

    return this.manager.executeQueryLocally(query) as Role[];
  }

  public getAllRolesNotAssociatedToUserId(userId:number) : Role[] {
    let predicate:Predicate = Predicate.create("userRoleMap", "any", "userId", "==", userId).not();
    let query:EntityQuery = EntityQuery
      .from(this.getEtype())
      .where(predicate)
      .expand("userRoleMap");

    return this.manager.executeQueryLocally(query) as Role[];
  }

  public createRole(role: any, permissionIds:number[]): Observable<Role> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + "/";
    let method:string = 'POST';
    let headers:Headers = this.apiHelper.getDefaultHeader();
    let roleData = role as any;
    roleData.permissions = permissionIds;
    let data:Object = roleData;

    let httpRequest = this.apiHelper.apiCall(url,method,null,data,headers);

    let _roleDAO = this;
    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          let updatedRoles = _roleDAO.manager.saveChangesForLocalEntityType(_roleDAO.getEtype());
          observer.next(updatedRoles[0] as Role);
          observer.complete();
        },
        error => {
          observer.error(error);
        });
    });
  }

  public updateRole(role: Role, permissionIds:number[]): Observable<Role> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + "/" + role.id;
    let method:string = 'PUT';
    let headers:Headers = this.apiHelper.getDefaultHeader();
    let data: Object = this.manager.getDataFromEntity(role);
    data["permissions"] = permissionIds;

    let httpRequest = this.apiHelper.apiCall(url, method, null, data, headers, null);

    let _roleDAO = this;
    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          let updatedRoles = _roleDAO.manager.saveChangesForLocalEntityType(_roleDAO.getEtype());
          //clear old map entity TODO: look for a more efficient way to do this
          _roleDAO.clearMap();
          observer.next(updatedRoles[0] as Role);
          observer.complete();
        },
        error => {
          observer.error(error);
        });
    });
  }

  private clearMap() {
    let entities:Entity[] = this.manager.getEntities("RolePermissionMap");
    entities.forEach((entity)=>{
      this.manager.detachEntity(entity);
    });
  }

  public canAccessItem(roleIds: any, permissionName: string) : boolean {
    let query: EntityQuery = EntityQuery
      .from(this.getEtype())
      .where("id", "in", roleIds);

    let roles = this.manager.executeQueryLocally(query) as any;
    let permissions = [];
    let foundGetAll = false;
    let foundGet = false;
    let foundPost = false;
    let foundPut = false;

    for (let role of roles) {
      //Cycle through each role's rolePermissionMap for item CRUD (need all 4 permissions to access item)
      role.rolePermissionMap.forEach((rolePermission) => {
        let permission = rolePermission.permission;

        if (permission.url.includes(permissionName)) {
          if (permission.path == "/") {
            if (permission.method == "GET" && !foundGetAll) {
              permissions.push(rolePermission);
              foundGetAll = true;
            } else if (permission.method == "POST" && !foundPost) {
              permissions.push(rolePermission);
              foundPost = true;
            }
          } else if (permission.path == "/:id") {
            if (permission.method == "GET" && !foundGet) {
              permissions.push(rolePermission);
              foundGet = true;
            } else if (permission.method == "PUT" && !foundPut) {
              permissions.push(rolePermission);
              foundPut = true;
            }
          }
        }
      });

      if (permissions.length == 4) {
        return true;
      }
    }

    return false;
  }

}
