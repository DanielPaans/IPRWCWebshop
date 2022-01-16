import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ShopModule } from '../shop/shop.module';
import {InfoModule} from "../info/info.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        ShopModule,
        InfoModule
    ]
})
export class HomeModule { }
