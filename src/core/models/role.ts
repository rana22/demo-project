import { EntityBase } from './entityBase';
import { Injectable} from '@angular/core';
import {
  core, MetadataStore, EntityType, AutoGeneratedKeyType, DataProperty, DataType,
  NavigationProperty, NavigationPropertyOptions
} from 'breeze-client';
import {User} from "./user";

@Injectable()
export class Role extends EntityBase {

  id: number;
  type: string;
  adminAccess: boolean;

  users?: User[];

  constructor() {
    super();
  }

  public init(metadataStore:MetadataStore) {

    this.entityType = new EntityType({
      shortName: "Role",
      namespace: "TDK",
      defaultResourceName: "Role",
      autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
      dataProperties: [
        new DataProperty({
          name: "id",
          dataType: DataType.Int32,
          isPartOfKey: true
        }),
        new DataProperty({
          name: "type",
          dataType: DataType.String
        }),
        new DataProperty({
          name: "adminAccess",
          dataType: DataType.Boolean
        })
      ],
      navigationProperties: [
        new NavigationProperty(<NavigationPropertyOptions>{
          entityTypeName: "UserRoleMap:#TDK",
          associationName: "UserRoleMap_Role",
          name: "userRoleMap",
          isScalar: false,
          invForeignKeyNames: ["roleId"]
        }),
        new NavigationProperty(<NavigationPropertyOptions>{
          entityTypeName: "RolePermissionMap:#TDK",
          associationName: "RolePermissionMap_Role",
          name: "rolePermissionMap",
          isScalar: false,
          invForeignKeyNames: ["roleId"]
        })
      ]
    });

    metadataStore.addEntityType(this.entityType);
    metadataStore.registerEntityTypeCtor('Role', Role, Role.initializer);
    this.entityType.createEntity();

  }
  /// [Initializer
  static initializer(entity:Role) {
  }

}
