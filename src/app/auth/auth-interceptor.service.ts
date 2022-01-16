import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {UserService} from "../shared/services/user.service";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userService: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const TOKEN = this.userService.user.value.token;
    if (TOKEN === '' || !TOKEN) {
      return next.handle(req);
    }
    try {
      const cloned = req.clone({
        setHeaders: {
          Authorization: "Bearer " + TOKEN
        }
      });
      return next.handle(cloned);
    } catch (e) {
      return next.handle(req);
    }
  }
}

