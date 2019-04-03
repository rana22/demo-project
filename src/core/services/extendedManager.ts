import {Entity, EntityManager, EntityState, EntityManagerOptions, EntityQuery, EntityType} from 'breeze-client';

export class ExtendedManager extends  EntityManager {

  constructor(config?: EntityManagerOptions | string) {
    super(config);
  }

  public includeDeletedInQueries() {
    this.queryOptions.includeDeleted = true;
  }

  public excludeDeletedInQueries() {
    this.queryOptions.includeDeleted = false;
  }

  /** @ngdoc method
  * @name createEntityFromServer
  * @methodOf angularseed.core.services.ExtendedManger
  * @description
  * Creates a new entity of a specified type and initializes it.
    * This method is used for entities retrieved from server outside of breeze, when those entities need to be treated
    * as "Unchanged" (as opposed to "Added") and also to apply the mergeStrategy specified in the manager's queryOptions.
  * @param {string} eType eType
  * @param {Object} initialVals initial values object for breeze entity
  * @returns {Object} Entity
  */
  public createEntityFromServer(eType:string, initialVals: Object) : Entity {
    var mergeStrategy = this.queryOptions.mergeStrategy;
    return this.createEntity(eType, initialVals, EntityState.Unchanged, mergeStrategy);
  }

  /**
   * @ngdoc method
   * @name getDataFromEntity
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Create simple javascript data object for an entity's non navigation properties
   * Useful for sending to the server, or otherwise avoid circular references in serialization
   * or data binding/watching.
   * @param {Object} entity A Breeze Entity
   * @returns {Object} Simple javascript data object
   */
  public getDataFromEntity(entity:Entity) : Object {
    var data:any = {};
    for(let dataProp of entity.entityType.getProperties()) {
      if(dataProp.isDataProperty && !dataProp.isNavigationProperty) {
        data[dataProp.name] = entity[dataProp.name];
      }
    }
    return data;
  }

  /**
   * @ngdoc method
   * @name saveChangesLocalForEntityType
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Sets entities of a specific entity type in local cache to "unchanged", effectively "saving" them locally
   * i.e. Breeze will no longer view them as modified or added entities
   * @params {Sting} Entity Type name
   * @returns {Array} Array of Entities
   */
  public saveChangesForLocalEntityType(eType:string) : Entity[]{
    var changes:Entity[] = this.getChanges();
    for(let change of changes) {
      if(change.entityType.shortName == eType) {
        (change.entityAspect.entityState != EntityState.Deleted)? change.entityAspect.setModified() : change.entityAspect.setDetached();
      }
    }
    return changes;
  }

  /**
   * @ngdoc method
   * @name saveChangesLocal
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Sets entities in local cache to "unchanged", effectively "saving" them locally
   * i.e. Breeze will no longer view them as modified or added entities
   * @returns {Array} Array of Entities
   */
  public saveChagesLocal() : Entity[] {
    var changes:Entity[] = this.getChanges();
    for(let change of changes) {
        (change.entityAspect.entityState != EntityState.Deleted)? change.entityAspect.setModified() : change.entityAspect.setDetached();
    }
    return changes;
  }

  /**
   * @ngdoc method
   * @name rollBackChanges
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Rejects changes on all changed entities in cache
   */
  public rollBackChanges() : Entity[] {
    var changes:Entity[] = this.getChanges();
    for(let change of changes) {
      change.entityAspect.rejectChanges();
    }
    return changes;
  }

  /**
   * @ngdoc method
   * @name rollBackChangesOnEntity
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Rejects changes on a specific changed entity in cache
   * @param {object} entity the entity on which the changes will be rolled back
   */
  public rollBackChangesOnEntity(entity: Entity) : Entity {
    entity.entityAspect.rejectChanges();
    return entity;
  }

  /**
   * @ngdoc method
   * @name getChangesForEntityType
   * @methodOf angularseed.core.services.ExtendedManger
   * @description
   * Get changes from entity manager. Returns a array of all changed entities of the specified EntityTypes.
   * A 'changed' Entity has has an EntityState of either Added, Modified or Deleted.
   * @param {string} eType
   * The name of the entity type
   * @returns {Array} Array of Entities
   */
  public getChangesForEntityType(eType:string) : Entity[] {
    return this.getChanges(eType);
  }

}
