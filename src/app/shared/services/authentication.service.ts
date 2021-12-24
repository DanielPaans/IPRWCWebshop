import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {User} from "../models/User";
import {catchError, Subject, tap, throwError} from "rxjs";
import {UserService} from "./user.service";

interface AuthResponse {
  role: string;
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

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

  public userSignup(user: User) {
    return this.http.post(this.USER_URL, user)
      .pipe(catchError(this.handleError));
  }

  public autoLogin() {
    try {
      this.userService.getStoredUser();

      if (this.userService.user.value.token) {
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
  }

  public autoLogout() {
    // TODO: handle when token expired response

    this.loggedIn.next(false);
  }

  public authenticate(username: string, password: string) {
    return this.http.post<AuthResponse>(this.AUTH_URL, {username, password})
      .pipe(catchError(this.handleError), tap((response: AuthResponse) => {
        this.handleAuthentication(response.role, response.jwt);
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

  private handleAuthentication(role: string, token: string) {
    const user = this.userService.user.value;
    user.role = role;
    user.token = token;
    this.userService.updateUser();
    this.loggedIn.next(true);
  }

  private handleError(err: HttpErrorResponse) {
    //TODO: error handling
    return throwError(() => err.error);
  }
}
