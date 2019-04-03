import { MetadataStore } from 'breeze-client';
import { Injectable } from '@angular/core';
import {User} from "./user";
import {Role} from "./role";
import {UserRoleMap} from "./userRoleMap";
import {JobSite} from "./jobSite";
import {Sample} from "./sample";
import {Permission} from "./permission";
import {RolePermissionMap} from "./rolePermissionMap";

@Injectable()
export class RegistrationHelper {

    constructor(
      private user:User,
      private role:Role,
      private userRoleMap:UserRoleMap,
      private permission:Permission,
      private rolePermissionMap:RolePermissionMap,
      private jobSite:JobSite,
      private sample:Sample
    ) {}

    register(metadataStore: MetadataStore) {
      this.user.init(metadataStore);
      this.role.init(metadataStore);
      this.userRoleMap.init(metadataStore);
      this.permission.init(metadataStore);
      this.rolePermissionMap.init(metadataStore);
      this.jobSite.init(metadataStore);
      this.sample.init(metadataStore);
    }

}
