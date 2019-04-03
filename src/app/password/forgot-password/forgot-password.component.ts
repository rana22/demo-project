import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserDAO} from "../../../core/services/dao/userDAO";
import {ErrorDialogService} from "../../shared/errorDialog/errorDialogService";

@Component({
  selector: 'app-forgot-password',
  templateUrl: 'forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {

  public email: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userDAO: UserDAO,
    private dialog: ErrorDialogService) { }

  ngOnInit() {

  }

  forgotPassword() {
    let url = window.location.origin + '/users/reset-password';
    let submitEmail = this.userDAO.requestEmail(this.email, url);

    submitEmail.subscribe((res) => {
      this.dialog.open("Email Sent","Follow the email's instructions to reset your password.");
    });
  }

  cancel() {
    this.router.navigate(['/login']);
  }

}
