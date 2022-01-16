import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { AdminModule } from './admin/admin.module';
import { InfoModule } from './info/info.module';
import { ShopModule } from './shop/shop.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {SnackbarService} from "./shared/services/snackbar.service";
import {PaymentModule} from "./payment/payment.module";
import {AuthModule} from "./auth/auth.module";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {ErrorInterceptorService} from "./error-page/error-interceptor.service";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    ContactModule,
    AdminModule,
    AuthModule,
    InfoModule,
    ShopModule,
    PaymentModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: SnackbarService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
