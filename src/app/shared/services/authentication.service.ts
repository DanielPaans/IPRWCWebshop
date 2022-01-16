import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/user";
import {catchError, Subject, tap, throwError} from "rxjs";
import {UserService} from "./user.service";
import * as shajs from 'sha.js';

interface AuthResponse {
  id: string;
  role: string;
  expiresAt: Date;
  jwt: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new Subject();

  private AUTH_URL: string = environment.HTTP_CONFIG.AUTH_PATH;
  private USER_URL: string = environment.HTTP_CONFIG.USER_PATH;
  private ADMIN_URL: string = environment.HTTP_CONFIG.ADMIN_PATH;

  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  public userSignup(user: User) {
    return this.http.post(this.USER_URL, user)
      .pipe(catchError(this.handleError));
  }

  public autoLogin() {
    try {
      this.userService.getStoredUser();

      if (this.userService.user.value.token) {
          this.autoLogout();
          this.loggedIn.next(true);
      }
    } catch (e) {
      this.userService.storeUser();
    }
  }

  public logout() {
    this.userService.removeStoredUser();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
    this.tokenExpirationTimer && clearTimeout(this.tokenExpirationTimer);
    this.tokenExpirationTimer = null;
  }

  public autoLogout() {
    const expirationDuration = new Date(this.userService.user.value.expiresAt).getTime() - new Date().getTime();

    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  public authenticate(username: string, password: string) {
    this.userService.user.value.username = username;

    username = shajs('sha256').update({username}).digest('hex');
    password = shajs('sha256').update({password}).digest('hex');

    return this.http.post<AuthResponse>(this.AUTH_URL, {username, password})
      .pipe(catchError(this.handleError), tap((response: AuthResponse) => {
        this.handleAuthentication(response.id, response.role, response.jwt, response.expiresAt);
      }));
  }

  // public updateCredentials(username?: string, password?: string, email?: string) {
  //   let params = new HttpParams();
  //   if (username) { params = params.append('username', username);
  //     console.log(params)}
  //   if (password) { params = params.append('password', password); }
  //   if (email) {params = params.append('email', email)}
  //
  //   return this.http.put(this.)
  // }

  private handleAuthentication(id: string, role: string, token: string, expiresAt: Date) {
    const user = this.userService.user.value;
    user.id = id;
    user.role = role;
    user.token = token;
    user.expiresAt = expiresAt;
    this.userService.updateUser();
    this.loggedIn.next(true);
    this.autoLogout();
  }

  private handleError(err: HttpErrorResponse) {
    //TODO: error handling
    return throwError(() => err.error);
  }
}
