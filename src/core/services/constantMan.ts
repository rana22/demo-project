import { Injectable } from '@angular/core';

//TODO convert to injectable?
export class ConstantMan {

  public static MANAGERS = {
    'MASTER' : 'masterManager',
    'SANDBOX': 'sandboxManager'
  };

  public static API = {
    BASE: {
      LOCAL   : 'http://localhost:3000/',
      //TODO Update to ts-node-seed DEV / STAGE locations
      DEV    : 'https://tdk-api-dev.herokuapp.com/',
      STAGE  : 'https://tdk-api-stage.herokuapp.com/',
      PROD   : 'prod'
    },
    RESOURCE : {
      USER       : 'users',
      LOGIN      : 'login',
      LOGOUT     : 'logout',
      SESSION    : 'session',
      ROLE       : 'roles',
      PERMISSION : 'permissions',
      PROFILE    :  'profile',
      JOB_SITE   : 'jobsites',
      SAMPLE     : 'samples',
      RESULT    :  'TestResults'
    }
  };

  public static STATUS_TYPE = {
    ACTIVE: "active",
    INACTIVE: "inactive"
  };

  //Default permissions ALL roles will always have.
  //Match these up with permissions.sql (node-api).
  public static DEFAULT_PERMISSIONS = [
    1, //Get all permissions
    2  //Get all roles
  ]

}
