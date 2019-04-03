import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import {Observable, Subject} from 'rxjs/Rx';
import { ConstantMan } from "./constantMan";
import { core } from 'breeze-client';
import {Router} from "@angular/router";


@Injectable()
export class ApiHelper {

  private accessToken:any;
  private env:string;
  private serviceName:string;
  private resources:Map<string,string> = new Map();
  private busySource = new Subject<any>();
  private apiErrorSource = new Subject<any>();

  busyChange$ = this.busySource.asObservable();
  apiErrorChange$ = this.apiErrorSource.asObservable();

  constructor(private http : Http, private router : Router) {
  }

  //config functions
  public setResources(name:string, resource:string) {
    this.resources.set(name, resource);
  }

  public setEnvironment(envArg:string) {
    this.env = envArg;
    switch(envArg) {
      case 'local' :
        this.serviceName = ConstantMan.API.BASE.LOCAL;
        break;
      case 'dev' :
        this.serviceName = ConstantMan.API.BASE.DEV;
        break;
      case 'stage' :
        this.serviceName = ConstantMan.API.BASE.STAGE;
        break;
      case 'prod' :
        this.serviceName = ConstantMan.API.BASE.PROD;
        break;
      default :
        this.serviceName = ConstantMan.API.BASE.DEV;
        this.env = 'dev';
    }
  }

  public getRelativePath(resName:string) : string {
    return this.getFullPath(resName, true);
  }

  public getResPath(resName:string, relPath:boolean) : string {
    return this.getFullPath(this.resources.get(resName), relPath);
  }

  public getServiceName() : string {
    return this.serviceName;
  }

  public getFullPath(res:string, relPath:boolean) : string {
    var path:string;
    if(relPath) {
      path = res;
    } else {
      path = this.serviceName + res;
    }
    return path;
  }

  public getDefaultHeader() : Headers{
    var headers:Headers = new Headers( {'Content-Type': 'application/json'} );
    if(!this.getAccessToken()) {
      return headers;
    }
    headers.set('Authorization', 'Bearer '+this.getAccessToken());
    return headers;
  }

  public getParameters(addlParameters : any) {
    var defaultParams = {};
    return core.extend(defaultParams, addlParameters);
  }

  public apiCall(url:string, method:string, params:any, data:any, headers:Headers, resource?:string) : Observable<any> {
    if(resource) {
      url = url + resource;
    }
    if(!data) {
      data = {};
    }

    var that = this;
    var reqOptions:RequestOptions = new RequestOptions({headers:headers, method:method, body:data, search:params});
    var observable = Observable.create(function subscribe(observer) {
      var httpRequest = that.http.request(url, reqOptions);
      httpRequest.subscribe(
        data => {
          var body = {};
          try {
            body = data.json();
          }
          catch(e) {
            console.log(e);
          }

          observer.next(body);
          observer.complete();
        },
        error => {
          that.handleApiError(error);
          observer.error(error);
        });
    }).share();

    this.setBusy(observable);

    return observable;
  }

  public handleApiError(apiError) {
    console.log(apiError);
    if (apiError.hasOwnProperty('status')) {
      switch(apiError.status) {
        case 401 :
          console.log('Unauthorized');
          this.setApiError({
            title: "Unauthorized",
            message: "Please try logging in again."
          });
          this.router.navigate(['/login']);
          break;
        case 403 :
          console.log('Forbidden');
          if (apiError.url.includes('login')) {
            this.setApiError({
              title: "Login Failed",
              message: "The username / password combination was invalid."
            });
            this.router.navigate(['/login']);
          } else if (apiError.url.includes('reset')) {
            this.setApiError({
              title: "Token Expired",
              message: "You cannot cannot reset your password at this time."
            });
            this.router.navigate(['/login']);
          } else {
            this.setApiError({
              title: "Access Forbidden",
              message: "You do not currently have access to that resource."
            });
            this.router.navigate(['/portal']);
          }
          break;
        case 404 :
          console.log("Not Found");
          this.setApiError({
            title: "404",
            message: "Page not found."
          });
          this.router.navigate(['/login']);
          break;
        default :
          this.setApiError({
            title: apiError.status + " " + apiError.statusText,
            message: apiError._body
          });
      }
    } else {
      console.log('unhandled API error');
    }

  }

  public setAccessToken(token:string) {
    this.accessToken = token;
    window.localStorage.setItem('accessToken', token);

  }

  public removeAccessToken() {
    this.accessToken = null;
    window.localStorage.removeItem('accessToken');
  }

  public getAccessToken() {
    this.accessToken = window.localStorage.getItem('accessToken');
    return this.accessToken;
  }

  public setBusy(busy:Observable<any>) {
    this.busySource.next(busy);
  }

  public setApiError(apiError) {
    console.log(apiError);
    this.apiErrorSource.next(apiError);
  }

}
