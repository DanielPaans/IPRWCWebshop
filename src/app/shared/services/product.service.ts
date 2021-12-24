import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Product} from "../models/Product";
import {Category} from "../models/Category";

export interface PostProduct {
  name: string;
  description: string;
  price: number;
  categories: Category[];
  amount: number;
  imagePath: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = environment.HTTP_CONFIG.PRODUCT_PATH;

  constructor(private http: HttpClient) { }

  public getProducts(keyword: string, filter?: string): Observable<any> {
    let params = new HttpParams().append('keyword', keyword);
    if (filter) { params = params.append('category', filter); }

    return this.http.get<Product[]>(this.URL, {params: params}).pipe(catchError(this.handleError));
  }

  public getProduct(id: string): Observable<any> {
    return this.http.get<Product>(this.URL + '/' + id).pipe(catchError(this.handleError));
  }

  public postProduct(product: PostProduct): Observable<any> {
    return this.http.post(this.URL, product).pipe(catchError(this.handleError));
  }

  public deleteProduct(productId): Observable<any> {
    return this.http.delete(this.URL + '/' + productId).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    //TODO: error handling
    return throwError(() => err.error);
  }
}
