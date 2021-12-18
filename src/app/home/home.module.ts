import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShopModule } from '../shop/shop.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class HomeModule { }
