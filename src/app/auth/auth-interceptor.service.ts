import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import { Observable } from 'rxjs';
import {UserService} from "../shared/services/user.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      const cloned = req.clone({
        headers: req.headers.set("Authorization", 'Bearer ' + this.userService.user.value.token)
      });
      return next.handle(cloned);
    } catch (e) {
      return next.handle(req);
    }
  }
}

