import {BaseDAO} from "./baseDAO";
import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ConstantMan } from '../constantMan'
import {ApiHelper} from "../apiHelper";
import {EntityManagerFactory} from "../entityManagerFactory";
import {User} from "../../models/user";
import {EntityQuery, Entity, Predicate} from "breeze-client";

@Injectable()
export class UserDAO extends BaseDAO {

  static PATHS = {
    FORGOT_PASSWORD : "/forgot-password/",
    RESET_PASSWORD  : "/reset-password/",
  };

  constructor(manager:string, apiHelper: ApiHelper, entityManagerFactory : EntityManagerFactory) {
    super(manager, ConstantMan.API.RESOURCE.USER, 'User', apiHelper, entityManagerFactory );
  }

  private currentUser : User;

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUser(currentUser: User): void {
    this.currentUser = currentUser;
  }

  public updateUser(user: User, roleIds:number[]): Observable<User> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + "/" + user.id;
    let method:string = 'PUT';
    let headers:Headers = this.apiHelper.getDefaultHeader();
    let data: Object = (window.location.pathname.includes(ConstantMan.API.RESOURCE.PROFILE)) ? user : this.manager.getDataFromEntity(user);
    data["roles"] = roleIds;

    let httpRequest = this.apiHelper.apiCall(url, method, null, data, headers, null);

    let _userDAO = this;
    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          let updatedUsers = _userDAO.manager.saveChangesForLocalEntityType(_userDAO.getEtype());
          _userDAO.clearMap();
          observer.next(updatedUsers[0] as User);
          observer.complete();
        },
        error => {
          observer.error(error);
        });
    });
  }

  public createUser(user: User, roleIds:number[]): Observable<User> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + "/";
    let method:string = 'POST';
    let headers:Headers = this.apiHelper.getDefaultHeader();
    let userData = user as any;
    userData.roles = roleIds;
    let data:Object = userData;

    let httpRequest = this.apiHelper.apiCall(url,method,null,data,headers);

    let _userDAO = this;
    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          let updatedUsers = _userDAO.manager.saveChangesForLocalEntityType(_userDAO.getEtype());
          observer.next(updatedUsers[0] as User);
          observer.complete();
        },
        error => {
          observer.error(error);
        });
    });
  }

  private clearMap() {
    let entities:Entity[] = this.manager.getEntities("UserRoleMap");
    entities.forEach((entity)=>{
      this.manager.detachEntity(entity);
    })
  }

  public requestEmail(email: string, currentUrl: string): Observable<User> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + UserDAO.PATHS.FORGOT_PASSWORD;
    let method:string = 'POST';
    let data:Object = {
      email: email,
      url: currentUrl
    };

    let httpRequest = this.apiHelper.apiCall(url,method,null,data,null);

    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          console.error(error);
        }
      )
    });
  }

  public getResettingUser(resetPasswordToken: string): Observable<User> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + UserDAO.PATHS.RESET_PASSWORD + resetPasswordToken;
    let method:string = 'GET';
    let params = resetPasswordToken;

    let httpRequest = this.apiHelper.apiCall(url,method,params,null,null);

    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          this.userResettingPassword = data;
          observer.next(data);
          observer.complete();
        },
        error => {
          console.error(error);
        }
      )
    });
  }

  public updateAndLogin(id: number, resetPasswordToken: string, password: string): Observable<User> {
    let url:string = this.apiHelper.getServiceName() + this.getResource() + UserDAO.PATHS.RESET_PASSWORD + resetPasswordToken;
    let method:string = 'PUT';
    let params = [id, resetPasswordToken, password];
    let data:Object = {
      id: id,
      password: password
    };

    let httpRequest = this.apiHelper.apiCall(url,method,params,data,null);

    return Observable.create(function subscribe(observer) {
      httpRequest.subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          console.error(error);
        }
      )
    });
  }

}
