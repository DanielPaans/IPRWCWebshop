import { Injectable } from '@angular/core';
import {Product} from "../models/Product";
import {User} from "../models/User";
import {BehaviorSubject, catchError, filter, map, Observable, Subject, take, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Category} from "../models/Category";
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

  public updateUser() {
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


  private handleError(err: HttpErrorResponse): Observable<never> {
    //TODO: error handling
    return throwError(() => err.error);
  }

  public clearCart(): void {
    this.user.value.shoppingCart.clear();
    this.storeUser();
  }

  public addToCart(product: Product): void {
    this.getStoredUser();
    this.user.value.shoppingCart.add(product.id);
    this.storeUser();
  }

  public removeFromCart(product: Product): void {
    this.getStoredUser();
    this.user.value.shoppingCart.delete(product.id);
    this.storeUser();
    this.updateUser();
  }

  public addToRecentlySearched(product: Product): void {
    this.getStoredUser();
    this.user.value.recentlySearched.add(product.id);
    this.storeUser();
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
      USER.role = userInfo.role;
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
      'role': this.user.value.role
    }));
  }
}
