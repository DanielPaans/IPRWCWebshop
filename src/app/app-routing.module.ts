import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { ShopComponent } from './shop/shop.component';
import {PaymentComponent} from "./payment/payment.component";
import {ProductDetailsComponent} from "./shop/product-details/product-details.component";
import {AdminComponent} from "./admin/admin.component";
import {AuthGuard} from "./auth/auth.guard";
import {LoginComponent} from "./auth/login/login.component";
import {SignupComponent} from "./auth/signup/signup.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: []},
  {path: 'shop', component: ShopComponent, children: []},
  {path: 'product/:id', component: ProductDetailsComponent, children: []},
  {path: 'info', component: InfoComponent, children: []},
  {path: 'contact', component: ContactComponent, children: []},
  {path: 'payment', component: PaymentComponent, children: []},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: []},
  {path: 'login', component: LoginComponent, children: []},
  {path: 'signup', component: SignupComponent, children: []},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Pagina niet gevonden'}},
  {path: 'server-error', component: ErrorPageComponent, data: {message: 'Er is iets misgegaan met de server'}},
  {path: 'unauthorized', component: ErrorPageComponent, data: {message: 'Je bent hier niet toegestaan'}},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
