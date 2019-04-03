import { EntityBase } from './entityBase';
import { Injectable} from '@angular/core';
import {
  core, MetadataStore, EntityType, AutoGeneratedKeyType, DataProperty, DataType,
  NavigationProperty, NavigationPropertyOptions
} from 'breeze-client';
import {Sample} from "./sample";

@Injectable()
export class JobSite extends EntityBase {

  id?: number;
  name?: string;
  description?: string;
  samples?: Sample[];

  constructor() {
    super();
  }

  public init(metadataStore:MetadataStore) {

    this.entityType = new EntityType({
      shortName: "JobSite",
      namespace: "TDK",
      defaultResourceName: "JobSite",
      autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
      dataProperties: [
        new DataProperty({
          name: "id",
          dataType: DataType.Int32,
          isPartOfKey: true
        }),
        new DataProperty({
          name: "name",
          dataType: DataType.String
        }),
        new DataProperty({
          name: "description",
          dataType: DataType.String
        })
      ],
      navigationProperties: [
        new NavigationProperty(<NavigationPropertyOptions>{
          entityTypeName: "Sample:#TDK",
          associationName: "Sample_Job",
          name: "samples",
          isScalar: false,
          invForeignKeyNames: ["jobSiteId"]
        })
      ]
    });

    metadataStore.addEntityType(this.entityType);
    metadataStore.registerEntityTypeCtor('JobSite', JobSite, JobSite.initializer);
    this.entityType.createEntity();

  }
  /// [Initializer
  static initializer(entity:JobSite) {
  }

}