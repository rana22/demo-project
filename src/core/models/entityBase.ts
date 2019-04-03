import { Entity, EntityAspect, EntityType, MetadataStore } from 'breeze-client';

export class EntityBase implements Entity {
  entityAspect: EntityAspect;
  entityType: EntityType;

  get $type(): string {
    if (!this.entityAspect) return '';
    return this.entityAspect.getKey().entityType.shortName;
  }

}
