import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    AdminComponent,
    AddProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminModule { }
