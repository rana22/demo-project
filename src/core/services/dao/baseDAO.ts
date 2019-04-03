import { Entity, EntityQuery, QueryResult, EntityState } from 'breeze-client';
import { Http, Response, Headers } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ApiHelper } from '../apiHelper';
import { IBaseDAO } from './IBaseDAO';
import {ExtendedManager} from "../extendedManager";
import {EntityManagerFactory} from "../entityManagerFactory";
import {ConstantMan} from "../constantMan";

export abstract class BaseDAO implements IBaseDAO {

  manager:ExtendedManager;

  constructor(private managerKey:string, private resource:string, private eType:string, public apiHelper: ApiHelper,
              private entityManagerFactory : EntityManagerFactory) {
    this.resource = resource;
    this.eType = eType;
    this.entityManagerFactory.addManager(ConstantMan.MANAGERS.SANDBOX);
    this.manager = entityManagerFactory.getManager(managerKey);
  }

  public clear() : Entity[] {
    return this.clearEntities();
  }

  public load() : Observable<QueryResult> {

    var dao = this;

    var loadPromise = this.loadFromServer();
    this.apiHelper.setBusy(Observable.fromPromise(loadPromise));
    loadPromise.then(function(result) {
    }).catch(function(error) {
      dao.apiHelper.handleApiError(error);
    });

    return Observable.fromPromise(loadPromise);
  }

  public loadById(id:any) : Observable<QueryResult> {

    var dao = this;

    var loadPromise = this.loadFromServer(this.resource + '/' + id);
    this.apiHelper.setBusy(Observable.fromPromise(loadPromise));
    loadPromise.then(function(result) {
      console.log(result);
    }).catch(function(error) {
      dao.apiHelper.handleApiError(error);
    });

    return Observable.fromPromise(loadPromise);
  }

  public get() : Entity[] {
    return this.getFromCache();
  }

  public getProjection(projection:string) : Entity[] {
    return this.getFromCache(projection);
  }

  public getById(id:any) : Entity {
    return this.manager.getEntityByKey(this.eType, id);
  }

  public getFromCacheOrServer() : Promise<Entity[]> {
    return this.fromCacheOrServer()
  }

  public create(initialVals : Object) : Entity {
    return this.manager.createEntity(this.eType, initialVals);
  }

  public createFromServer(initialVals: Object) : Entity {
    return this.manager.createEntityFromServer(this.eType, initialVals);
  }

  public serverCreate(initialVals: Object) : Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.createEntityCall(initialVals,this.resource).toPromise()
        .then((results) => {
          let serverEntity:Entity = this.manager.createEntityFromServer(this.eType, results.json);
          //Entity returned from server only has type value assigned to it. so discard it.
          serverEntity.entityAspect.setDetached();
          resolve(results);
        }).catch(() => {
        reject("failed server create");
      })
    });
  }

  public serverUpdate(entity: Entity) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.updateEntityCall(entity,this.resource).toPromise()
        .then((results) => {
          this.manager.saveChangesForLocalEntityType(this.eType);
          resolve(null);
        }).catch(() => {
        reject("failed server update");
      })
    });
  }

  public serverDelete(entity: Entity) : Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.deleteEntityCall(entity,this.resource).toPromise()
        .then((results) => {
          entity.entityAspect.setDetached();
          resolve(null);
        }).catch(() => {
        reject("failed server delete");
      })
    });
  }

  public getEtype() : string {
    return this.eType;
  }

  public getResource() : string {
    return this.resource;
  }

  public getManager() : ExtendedManager {
    return this.manager;
  }


  //get from cache
  private getFromCache(projection?:string) : Entity[] {
    var query:EntityQuery = EntityQuery.from(this.eType);
    if(projection) {
      query.select(projection);
    }
    return this.manager.executeQueryLocally(query);
  }

  //load from server
  private loadFromServer(resourceUrl?: string) : Promise<QueryResult> {
    var query:EntityQuery = new EntityQuery().from(resourceUrl || this.resource);
    return this.manager.executeQuery(query) as any as Promise<QueryResult>;
  }

  private fromCacheOrServer() : Promise<Entity[]> {
    return new Promise<Entity[]>((resolve,reject) => {
      var entitiesFromCache : Entity[] = this.getFromCache();
      if(entitiesFromCache.length > 0) {
        resolve(entitiesFromCache);
      } else {
        this.loadFromServer().then(
          (result) => resolve(result.results),
          (err) => reject(err))
          .catch((err) => reject(err));
      }
    });
  }

  //create

  private createEntityCall(data:any,resource:string) : Observable<Response> {
    var url:string = this.apiHelper.getServiceName() + resource;
    var method:string = 'POST';
    var params = null;
    var headers:Headers = this.apiHelper.getDefaultHeader();
    return this.apiHelper.apiCall(url,method,params,data,headers);
  }

 //update

  private updateEntityCall(entity:Entity,resource:string) : Observable<Response> {
    var url:string = this.apiHelper.getServiceName() + resource + "/" + (entity['id'] as any as string);
    var method:string = 'PUT';
    var params = null;
    var headers:Headers = this.apiHelper.getDefaultHeader();
    var data:Object = this.manager.getDataFromEntity(entity);
    return this.apiHelper.apiCall(url,method,params,data,headers);
  }

  //delete
  private clearEntities() : Entity[] {
    var entities:Entity[] = this.getFromCache();
    for(let entity of entities) {
      entity.entityAspect.setDetached();
    }
    return entities;
  }

  private deleteEntityCall(entity:Entity,resource:string) : Observable<Response> {
    var url:string = this.apiHelper.getServiceName() + resource + "/" + (entity['id'] as any as string);
    var method:string = 'DELETE';
    var headers:Headers = this.apiHelper.getDefaultHeader();
    var params = null;
    var data = null;
    return this.apiHelper.apiCall(url,method,params,data,headers);
  }

}
