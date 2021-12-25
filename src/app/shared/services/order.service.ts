import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../environments/environment";
import {Order} from "../models/order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = environment.HTTP_CONFIG.ORDER_PATH;
  constructor(private http: HttpClient) { }

  public placeOrder(order: Order): Observable<any> {
    return this.http.post(this.URL, {orderItems: order.orderItems, userId: order.userId}).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = "Something went wrong";
    switch (err.error.error) {
      case 'User is not logged in':
        errorMessage = "Not logged in";
        break;
    }
    return throwError(() => errorMessage);
  }
}
