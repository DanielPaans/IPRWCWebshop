import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopModule } from '../shop/shop.module';
import {PaymentComponent} from "./payment.component";
import {SharedModule} from "../shared/shared.module";
import { ShoppingCartItemComponent } from './shopping-cart-item/shopping-cart-item.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { AuthAlertComponent } from './auth-alert/auth-alert.component';

@NgModule({
  declarations: [
    PaymentComponent,
    ShoppingCartItemComponent,
    CheckOutComponent,
    AuthAlertComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopModule
  ]
})
export class PaymentModule { }
