import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDAO} from "../../../core/services/dao/userDAO";
import {ApiHelper} from "../../../core/services/apiHelper";
import {ErrorDialogService} from "../../shared/errorDialog/errorDialogService";
import {AuthService} from "../../../core/services/auth.service";


@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {

  public resetPasswordToken: string;
  public newPassword: string;
  public confirmPassword: string;
  public selectedUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDAO: UserDAO,
    private apiHelper: ApiHelper,
    private authService: AuthService,
    private dialog: ErrorDialogService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.resetPasswordToken = params['resetPasswordToken'];
    });

    let findingUser = this.userDAO.getResettingUser(this.resetPasswordToken);

    findingUser.subscribe((res) => {
      this.selectedUser = res;
      let tokenExpireDate = new Date(this.selectedUser.resetPasswordExpires);
      this.checkTime(tokenExpireDate);
    });
  }

  resetPassword() {
    this.checkTime(this.selectedUser);

    if (this.newPassword == this.confirmPassword) {
      let updateUser = this.userDAO.updateAndLogin(this.selectedUser.id, this.resetPasswordToken, this.newPassword);
      updateUser.subscribe((res) => {
        this.authService.login(this.selectedUser.username, this.newPassword)
          .subscribe(
            data => {
              console.log(data);
              this.dialog.open("Success","Your password has been updated.");
              this.router.navigate(['portal']);
            },
            error => {
              console.log("login failed");
            });
      });
    } else {
      this.dialog.open("Invalid Password","The passwords don't match.");
    }
  }

  checkTime(tokenExpireDate: any) {
    if (new Date(Date.now()) > tokenExpireDate) {
      let apiError = {status: 403, url: this.router.url};
      this.apiHelper.handleApiError(apiError);
    }
  }
}
