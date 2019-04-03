import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, ErrorHandler} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import '@angular/material';
import {MaterialModule} from '@angular/material';
import 'hammerjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {BreezeBridgeAngularModule} from 'breeze-bridge-angular';
import {AgGridModule} from 'ag-grid-angular/main';
import {BusyModule, BusyConfig} from "angular2-busy";
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ApiHelper} from '../core/services/apiHelper';
import {CoreModule} from '../core/core.module';
import {LoginModule} from './login/login.module';
import {PortalModule} from './portal/portal.module';
import {ListGridComponent} from "./shared/listGrid/listGrid.component";
import { SharedModule } from "./shared/shared.module";
import {GlobalErrorHandler} from "../core/services/GlobalErrorHandler";
import {ErrorDialogModule} from "./shared/errorDialog/errorDialog.module";
import {DatePipe, CurrencyPipe} from "@angular/common";
import {ResetPasswordModule} from './password/reset-password/reset-password.module';
import {ForgotPasswordModule} from "./password/forgot-password/forgot-password.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    LoginModule,
    ResetPasswordModule,
    ForgotPasswordModule,
    PortalModule,
    BreezeBridgeAngularModule,
    CoreModule,
    AgGridModule.withComponents([
      ListGridComponent
    ]),
    BusyModule,
    ErrorDialogModule,
    FlexLayoutModule
  ],
  providers: [
    ApiHelper, {provide: ErrorHandler, useClass: GlobalErrorHandler},
    DatePipe,
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
