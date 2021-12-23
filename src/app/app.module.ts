import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from './home/home.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { InfoModule } from './info/info.module';
import { ShopModule } from './shop/shop.module';
import {HttpClientModule} from "@angular/common/http";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {SnackbarService} from "./shared/snackbar.service";
import {PaymentComponent} from "./payment/payment.component";
import {PaymentModule} from "./payment/payment.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    ContactModule,
    AuthModule,
    AdminModule,
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
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {provide: SnackbarService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
