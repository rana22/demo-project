import { EntityBase } from './entityBase';
import { Injectable} from '@angular/core';
import {
  core, MetadataStore, EntityType, AutoGeneratedKeyType, DataProperty, DataType,
  NavigationProperty, NavigationPropertyOptions
} from 'breeze-client';
import {Role} from "./role";
import {Permission} from "./permission";

@Injectable()
export class RolePermissionMap extends EntityBase {

  roleId: number;
  role: Role;
  permissionId: number;
  permission: Permission;

  constructor() {
    super();
  }

  public init(metadataStore:MetadataStore) {

    this.entityType = new EntityType({
      shortName: "RolePermissionMap",
      namespace: "TDK",
      defaultResourceName: "RolePermissionMap",
      autoGeneratedKeyType: AutoGeneratedKeyType.Identity,
      dataProperties: [
        new DataProperty({
          name: "roleId",
          dataType: DataType.Int32,
          isPartOfKey: true
        }),
        new DataProperty({
          name: "permissionId",
          dataType: DataType.Int32,
          isPartOfKey: true
        })
      ],
      navigationProperties: [
        new NavigationProperty(<NavigationPropertyOptions>{
          entityTypeName: "Role:#TDK",
          associationName: "RolePermissionMap_Role",
          name: "role",
          isScalar: true,
          foreignKeyNames: ["roleId"]
        }),
        new NavigationProperty(<NavigationPropertyOptions>{
          entityTypeName: "Permission:#TDK",
          associationName: "RolePermissionMap_Permission",
          name: "permission",
          isScalar: true,
          foreignKeyNames: ["permissionId"]
        })
      ]
    });

    metadataStore.addEntityType(this.entityType);
    metadataStore.registerEntityTypeCtor('RolePermissionMap', RolePermissionMap, RolePermissionMap.initializer);
    this.entityType.createEntity();

  }
  /// [Initializer
  static initializer(entity:RolePermissionMap) {
  }

}