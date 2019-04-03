import {EntityManagerFactory} from "../entityManagerFactory";
import {ApiHelper} from "../apiHelper";
import {ConstantMan} from "../constantMan";
import {UserDAO} from "./userDAO";
import {RoleDAO} from "./roleDAO";
import {JobSiteDAO} from "./jobSiteDAO";
import {SampleDAO} from "./sampleDAO";
import {PermissionDAO} from "./permissionDAO";

export function masterUserDaoFactory(apiHelper:ApiHelper, entityManagerFactory:EntityManagerFactory) {
  return  new UserDAO(ConstantMan.MANAGERS.MASTER, apiHelper, entityManagerFactory);
}

export function masterRoleDaoFactory(apiHelper:ApiHelper, entityManagerFactory:EntityManagerFactory) {
  return new RoleDAO(ConstantMan.MANAGERS.MASTER, apiHelper, entityManagerFactory);
}

export function masterPermissionDaoFactory(apiHelper:ApiHelper, entityManagerFactory:EntityManagerFactory) {
  return  new PermissionDAO(ConstantMan.MANAGERS.MASTER, apiHelper, entityManagerFactory);
}

export function masterJobSiteDaoFactory(apiHelper:ApiHelper, entityManagerFactory:EntityManagerFactory) {
  return  new JobSiteDAO(ConstantMan.MANAGERS.MASTER, apiHelper, entityManagerFactory);
}

export function masterSampleDAOFactory(apiHelper:ApiHelper, entityManagerFactory:EntityManagerFactory) {
  return  new SampleDAO(ConstantMan.MANAGERS.MASTER, apiHelper, entityManagerFactory);
}

export function provideMasterUserDAO() {
  return {
    provide: UserDAO, useFactory: masterUserDaoFactory,
    deps:[ApiHelper, EntityManagerFactory]
  }
}

export function provideMasterRoleDAO() {
  return {
    provide: RoleDAO, useFactory: masterRoleDaoFactory,
    deps:[ApiHelper, EntityManagerFactory]
  }
}

export function provideMasterPermissionDAO() {
  return {
    provide: PermissionDAO, useFactory: masterPermissionDaoFactory,
    deps:[ApiHelper, EntityManagerFactory]
  }
}

export function provideMasterJobSiteDAO() {
  return {
    provide: JobSiteDAO, useFactory: masterJobSiteDaoFactory,
    deps:[ApiHelper, EntityManagerFactory]
  }
}

export function provideMasterSampleDAO() {
  return {
    provide: SampleDAO, useFactory: masterSampleDAOFactory,
    deps:[ApiHelper, EntityManagerFactory]
  }
}
