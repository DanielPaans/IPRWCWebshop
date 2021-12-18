import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { ErrorPageComponent } from '../error-page/error-page.component';
import { FooterComponent } from '../footer/footer.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    ErrorPageComponent,
    FooterComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
