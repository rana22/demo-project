import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiHelper} from "../core/services/apiHelper";
import {environment} from "../environments/environment";
import {AuthService} from "../core/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ErrorDialogService} from "./shared/errorDialog/errorDialogService";
import {UserDAO} from "../core/services/dao/userDAO";
import {ConstantMan} from "../core/services/constantMan";
import {RoleDAO} from "../core/services/dao/roleDAO";
import {PermissionDAO} from "../core/services/dao/permissionDAO";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Welcome';
  isLoggedIn: boolean = false;
  isErrorDialogActive: boolean = false;
  authSubscription: Subscription;
  busySubscription: Subscription;
  apiErrorSubscription: Subscription;
  busy:Subscription;
  constructor(
      private apiHelper:ApiHelper,
      private authenticationService: AuthService,
      private router: Router,
      private route: ActivatedRoute,
      private userDAO: UserDAO,
      public errorDialogService: ErrorDialogService,
      private roleDAO: RoleDAO,
      private permissionDAO: PermissionDAO
  ) {
    console.log('Environment config');
    console.log(environment.envName);
    var that = this;

    this.apiHelper.setEnvironment(environment.envName);
    this.authSubscription = this.authenticationService.loggedInStatusChange$.subscribe(
      loggedIn => {
        this.isLoggedIn = loggedIn;
      }
    );
    this.busySubscription = this.apiHelper.busyChange$.subscribe(
      busy => {
        this.busy = busy.subscribe();
      }
    );
    this.apiErrorSubscription = this.apiHelper.apiErrorChange$.subscribe(
      apiError => {
        console.log(apiError);
        if (!that.isErrorDialogActive) {
          that.isErrorDialogActive = true;
          this.errorDialogService
            .open(apiError.title, apiError.message)
            .subscribe(result => {
              console.log(result);
              that.isErrorDialogActive = false;
            });
        }
      }
    );
  }

  ngOnInit() {
    //check session?
    let checkReset: string = window.location.pathname;
    if (window.location.pathname !== '/login' && window.location.pathname !== '/' && window.location.pathname !== '/login/forgot-password') {
      if (!window.location.pathname.includes('/reset-password/')) {
        this.authenticationService.checkSession()
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              this.router.navigate(['login']);
            }
          )
      }
    }
  }

  logout() {
    this.authenticationService.logout()
      .subscribe(
        data => {
          this.router.navigate(['login']);
        },
        error => {
          console.log('logout failed');
        }
      )
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.authSubscription.unsubscribe();
    this.busySubscription.unsubscribe();
    this.apiErrorSubscription.unsubscribe();
    this.busy.unsubscribe();
  }

  canAccessAdmin() {
    let currentUser = this.userDAO.getCurrentUser();

    if (currentUser) {
      for (let role of currentUser.roles) {
        if (role.adminAccess) {
          return  true;
        }
      }
    }
    return false;
  }

  accessItem(itemType: string) {
    if (this.roleDAO.get().length != 0 && this.permissionDAO.get().length != 0) {
      let roleIds: number[] = [];
      this.userDAO.getCurrentUser().roles.forEach((role) => {
        roleIds.push(role.id);
      });
      return this.roleDAO.canAccessItem(roleIds, itemType);
    }
  }

  notOnPortalScreen() {
    return window.location.pathname != "/portal";
  }

  back() {
    window.history.back();
  }
}
