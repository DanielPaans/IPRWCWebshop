import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Router} from "@angular/router";

export class HttpError{
  static BadRequest = 400;
  static Unauthorized = 401;
  static Forbidden = 403;
  static NotFound = 404;
  static TimeOut = 408;
  static Conflict = 409;
  static InternalServerError = 500;
}

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      return this.handleError(error);
    }));
  }

  private handleError(exception: HttpErrorResponse) {
    if (exception instanceof HttpErrorResponse) {
      switch (exception.status) {
        case HttpError.InternalServerError:
          this.router.navigate(['/server-error']);
          break;
        case HttpError.Forbidden:
          this.router.navigate(['/unauthorized']);
          break;
      }
      return throwError(() => exception);
    }
  }
}
