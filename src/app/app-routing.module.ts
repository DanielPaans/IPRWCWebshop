import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, children: []},
  {path: 'not-found', component: ErrorPageComponent, data: {message: 'Pagina niet gevonden'}},
  {path: 'server-error', component: ErrorPageComponent, data: {message: 'Er is iets misgegaan met de server'}},
  {path: 'unauthorized', component: ErrorPageComponent, data: {message: 'Je bent hier niet toegestaan'}},
  {path: '**', redirectTo: '/not-found', pathMatch: 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
