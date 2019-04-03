/**
 * Created by rkidwai on 3/7/17.
 */
import { Entity, EntityManager, EntityAspect, EntityType, EntityQuery, QueryResult, EntityState } from 'breeze-client';
import {Observable} from "rxjs";

export interface IBaseDAO {

  clear() : Entity[];
  load() : Observable<QueryResult>;
  loadById(id:any) : Observable<QueryResult>;
  get() : Entity[];
  getProjection(projection:string) : Entity[];
  getById(id:any) : Entity;
  getFromCacheOrServer() : Promise<Entity[]>;
  create(initialVals: Object) :Entity;
  createFromServer(initialVals: Object) : Entity;
  serverCreate(initialVals: Object) : Promise<void>;
  serverUpdate(entity: Entity) : Promise<void>;
  serverDelete(entity: Entity) : Promise<void>;
  getEtype() : string;
  getResource() : string;
  getManager() : EntityManager;

}
