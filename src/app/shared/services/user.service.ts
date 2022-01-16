import { Injectable } from '@angular/core';
import {Product} from "../models/product";
import {User} from "../models/user";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ProductService} from "./product.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user = new BehaviorSubject<User>(new User());

  private USER_KEYS = ['shoppingCart', 'recentlySearched', 'userInfo'];
  private URL = environment.HTTP_CONFIG.USER_PATH;

  constructor(private http: HttpClient, private productService: ProductService) {
  }

  public addUser(user: User, password: string): Observable<any> {
    const body = {email: user.email, username: user.username, password: password,
                  postalCode: user.postalCode, city: user.city};
    return this.http.post(this.URL, body).pipe(catchError(this.handleError), tap(user => {
      console.log('in tap')
      const USER = this.user.value;
      USER.id = user.id;
      USER.username = user.username;
      USER.email = user.email;
      USER.postalCode = user.postalCode;
      USER.email = user.email;
      this.updateUser();
      console.log('user updated')
    }));
  }

  public updateUser(): void {
    this.storeUser();
    this.getStoredUser();
  }

  public getShoppingCart(): Product[] {
    this.checkProducts();
    const products: Product[] = [];
    this.user.value.shoppingCart.forEach(productId => {
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

  public getRecentlySearched(limit?: number): Product[] {
    this.checkProducts();
    const products: Product[] = [];
    Array.from(this.user.value.recentlySearched).slice(-limit).reverse().forEach(productId => {
      this.productService.getProduct(productId).subscribe({
        next: (product: Product) => {
          products.push(product);
        }
      });
    });
    return products;
  }

  private checkProducts(): void {
    this.productService.getProducts('').subscribe(products => {
      products = products.map(product => {
        return product.id;
      });

      this.user.value.shoppingCart.forEach(id => {
        if (!(products.includes(id))) {
          this.user.value.shoppingCart.delete(id);
        }
      });

      this.user.value.recentlySearched.forEach(id => {
        if (!(products.includes(id))) {
          this.user.value.recentlySearched.delete(id);
        }
      });

      this.storeUser();
    });
  }

  public clearCart(): void {
    this.user.value.shoppingCart.clear();
    this.updateUser();
  }

  public addToCart(product: Product): void {
    this.getStoredUser();
    this.user.value.shoppingCart.add(product.id);
    this.updateUser();
  }

  public removeFromCart(product: Product): void {
    this.getStoredUser();
    this.user.value.shoppingCart.delete(product.id);
    this.updateUser();
  }

  public addToRecentlySearched(product: Product): void {
    this.getStoredUser();
    this.user.value.recentlySearched.add(product.id);
    this.updateUser();
  }

  public removeStoredUser(): void {
    localStorage.removeItem(this.USER_KEYS[2]);
    this.getStoredUser();
  }

  public getStoredUser(): void {
    const USER = new User();
    const shoppingCartLocalStorage = localStorage.getItem(this.USER_KEYS[0]);
    const recentlySearchedLocalStorage = localStorage.getItem(this.USER_KEYS[1]);
    const userInfoLocalStorage = localStorage.getItem(this.USER_KEYS[2]);

    if(shoppingCartLocalStorage) {
      USER.shoppingCart = new Set<string>(Array.from(JSON.parse(shoppingCartLocalStorage)));
    }
    if(recentlySearchedLocalStorage) {
      USER.recentlySearched = new Set<string>(Array.from(JSON.parse(recentlySearchedLocalStorage)));
    }

    if(userInfoLocalStorage) {
      const userInfo = JSON.parse(userInfoLocalStorage);
      USER.username = userInfo.username;
      USER.email = userInfo.email;
      USER.token = userInfo.token;
      USER.expiresAt = userInfo.expiresAt;
      USER.role = userInfo.role;
      USER.id = userInfo.id;
      USER.postalCode = userInfo.postalCode;
      USER.city = userInfo.city;
    }

    this.user.next(USER);
  }

  public storeUser(): void {
    localStorage.setItem(this.USER_KEYS[0], JSON.stringify(Array.from(this.user.value.shoppingCart.values())));
    localStorage.setItem(this.USER_KEYS[1], JSON.stringify(Array.from(this.user.value.recentlySearched.values())));
    localStorage.setItem(this.USER_KEYS[2], JSON.stringify({
      'username': this.user.value.username,
      'email': this.user.value.email,
      'token': this.user.value.token,
      'expiresAt': this.user.value.expiresAt,
      'role': this.user.value.role,
      'id': this.user.value.id,
      'postalCode': this.user.value.postalCode,
      'city': this.user.value.city
    }));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage = "Something went wrong";
    switch (err.error.error) {
      case 'Username already in use':
        errorMessage = "User with this username already exists, try a different username";
        break;
    }
    return throwError(() => errorMessage);
  }
}
