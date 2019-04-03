import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {UserDAO} from "../../core/services/dao/userDAO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private userDAO: UserDAO) { }

  ngOnInit() {
  }

  login() {
    console.log(this.model);
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log(data);
          this.router.navigate(['portal']);
        },
        error => {
          console.log("login failed");
        });
  }
}
