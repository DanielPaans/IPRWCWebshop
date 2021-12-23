import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { ShopModule } from '../shop/shop.module';

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    ShopModule
  ]
})
export class PaymentModule { }
