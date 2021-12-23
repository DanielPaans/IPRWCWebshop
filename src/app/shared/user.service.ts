import { Injectable } from '@angular/core';
import {Product} from "./models/Product";
import {User} from "./models/User";
import {BehaviorSubject, catchError, Observable, Subject, take, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Category} from "./models/Category";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new User();
  public userSubject = new Subject<User>();

  private USER_KEYS = ['shoppingCart', 'recentlySearched', 'userInfo'];
  private URL = environment.HTTP_CONFIG.USER_PATH;

  constructor(private http: HttpClient, private productService: ProductService) {
  }

  public storeUser(): void {
    localStorage.setItem(this.USER_KEYS[0], JSON.stringify(Array.from(this.user.shoppingCart.values())));
    localStorage.setItem(this.USER_KEYS[1], JSON.stringify(Array.from(this.user.recentlySearched.values())));
  }

  public getUser(): void {
    this.http.get<User>(this.URL).pipe(catchError(this.handleError)).subscribe({
      next: value => {
        console.log(value);

        this.userSubject.next(value);
      }, error: err => {
        console.log(err);
        //TODO: handle error
      }
    });
  }

  public getShoppingCart(): Product[] {
    const products: Product[] = [];
    this.user.shoppingCart.forEach(productId => {
      this.productService.getProduct(productId).subscribe({
        next: (product: Product) => {
          products.push(product);
        }, error: err => {
          console.log(err);
        }
      });
    });
    return products;
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    //TODO: error handling
    return throwError(() => err.error);
  }

  public addToCart(product: Product) {
    this.getStoredUser();
    this.user.shoppingCart.add(product.id);
    this.storeUser();
  }

  public addToRecentlySearched(product: Product) {
    this.getStoredUser();
    this.user.recentlySearched.add(product.id);
    this.storeUser();
  }

  private getStoredUser(): void {
    this.user.shoppingCart = new Set<string>(Array.from(JSON.parse(localStorage.getItem(this.USER_KEYS[0]))));
    this.user.recentlySearched = new Set<string>(Array.from(JSON.parse(localStorage.getItem(this.USER_KEYS[1]))));
  }
}
