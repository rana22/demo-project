import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../app/shared/shared.module';
import { EntityManagerFactory } from "./services/entityManagerFactory";
import { JsonResultsAdaptor } from "./services/jsonResultsAdaptor";
import { RegistrationHelper } from "./models/registration-helper";

import * as Services from './services/services';
import * as Models from "./models/entityModels";
import * as DaoProvider from "./services/dao/daoProvider";

// ATTENTION: Never import this module into a lazy loaded module. Only import into app module.
@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [],
  exports: [],
  providers: [
    //SERVICES
    JsonResultsAdaptor,
    EntityManagerFactory,
    Services.AuthService,
    Services.ApiHelper,
    //MODELS
    RegistrationHelper,
    Models.User,
    Models.Role,
    Models.UserRoleMap,
    Models.Permission,
    Models.RolePermissionMap,
    Models.JobSite,
    Models.Sample,
    //DAOs
    DaoProvider.provideMasterUserDAO(),
    DaoProvider.provideMasterRoleDAO(),
    DaoProvider.provideMasterPermissionDAO(),
    DaoProvider.provideMasterJobSiteDAO(),
    DaoProvider.provideMasterSampleDAO()
  ]
})
export class CoreModule { }
