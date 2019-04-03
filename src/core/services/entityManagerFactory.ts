
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Injectable, Injector } from '@angular/core';
import { MergeStrategy, QueryOptions, config, DataService, EntityManagerProperties } from 'breeze-client';
import { AjaxAngularAdapter } from 'breeze-bridge-angular'
import {ApiHelper} from "./apiHelper";
import {JsonResultsAdaptor} from "./jsonResultsAdaptor";
import { RegistrationHelper } from '../models/registration-helper';
import { ExtendedManager } from './extendedManager';
import {ConstantMan} from "./constantMan";
import {environment} from "../../environments/environment";


@Injectable()
export class EntityManagerFactory {


  private managersMap: Map<string, ExtendedManager>;
  private masterManager: ExtendedManager;
  private ds : DataService;

  constructor(private http : Http, private apiHelper: ApiHelper, private jsonAdaptor:JsonResultsAdaptor,
              private registrationHelper:RegistrationHelper) {
    this.managersMap = new Map<string,ExtendedManager>();
    this.masterManager = new ExtendedManager(ConstantMan.MANAGERS.MASTER);
    this.createManagers();
  }

  private createManagers() {
    var ajaxAdaptor: AjaxAngularAdapter = new AjaxAngularAdapter(this.http);
    var apiHelper = this.apiHelper;
    ajaxAdaptor.requestInterceptor = function(requestInfo){
      var request = <any>requestInfo;
      request.request.headers = apiHelper.getDefaultHeader();
      return request;
    };
    config.registerAdapter('ajax', () => ajaxAdaptor);
    config.initializeAdapterInstance('ajax', ajaxAdaptor.name, true);

    //TODO figure out dependency order
    if(!this.apiHelper.getServiceName()) {
      this.apiHelper.setEnvironment(environment.envName);
    }

    this.ds = new DataService({
      serviceName: this.apiHelper.getServiceName(),
      hasServerMetadata: false,
      jsonResultsAdapter: this.jsonAdaptor
    });

    console.log(this.ds.serviceName);

    this.masterManager = this.createMasterManger();

    this.managersMap.forEach((manager:ExtendedManager, name:string) =>{
      var newMgr = this.masterManager.createEmptyCopy();
    });

    this.addManagerToMap(ConstantMan.MANAGERS.MASTER, this.masterManager);

  }

  private createMasterManger() : ExtendedManager {
    var newMasterManager: ExtendedManager = new ExtendedManager({dataService: this.ds});
    newMasterManager = this.setQueryOptions(false, newMasterManager);
    console.log(newMasterManager);
    this.registrationHelper.register(newMasterManager.metadataStore);

    return newMasterManager;
  }

  private setQueryOptions(includeDeleted:boolean, manager: ExtendedManager) : ExtendedManager{
    var newQo: QueryOptions = new QueryOptions();
    newQo.mergeStrategy = MergeStrategy.OverwriteChanges;
    newQo.includeDeleted = includeDeleted;
    manager.setProperties({queryOptions:newQo});
    return manager;
  }

  public addManagerToMap(managerKey:string, manager:ExtendedManager) {
    this.managersMap.set(managerKey, manager);
  }

  public getManager(managerKey:string) : ExtendedManager {
    return this.managersMap.get(managerKey);
  }

  public addManager(managerKey:string) {
    this.addManagerToMap(managerKey, new ExtendedManager(managerKey));
  }

}
