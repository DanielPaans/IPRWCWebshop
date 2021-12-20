import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import {TitlecasePipe} from "./pipes/titlecase.pipe";
import {PathPipe} from "./pipes/path.pipe";
import {PricePipe} from "./pipes/price.pipe";


@NgModule({
  declarations: [
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent,
    TitlecasePipe,
    PathPipe,
    PricePipe
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent,
    CommonModule,
    FormsModule,
    AppRoutingModule,
    TitlecasePipe,
    PathPipe,
    PricePipe
  ]
})
export class SharedModule { }
