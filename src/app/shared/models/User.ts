import {Product} from "./Product";

export class User {

  private _recentlySearched: Set<string>;
  private _shoppingCart: Set<string>;
  private _username: string;
  private _role: string;
  private _email: string;
  private _token: string;


  constructor(recentlySearched: Set<string> = new Set<string>(), shoppingCart: Set<string> = new Set<string>(),
              username?: string, role?: string, email?: string, token?: string) {
    this._recentlySearched = recentlySearched;
    this._shoppingCart = shoppingCart;
    this._username = username;
    this._role = role;
    this._email = email;
    this._token = token;
  }


  get recentlySearched(): Set<string> {
    return this._recentlySearched;
  }

  set recentlySearched(value: Set<string>) {
    this._recentlySearched = value;
  }

  get shoppingCart(): Set<string> {
    return this._shoppingCart;
  }

  set shoppingCart(value: Set<string>) {
    this._shoppingCart = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get token(): string {
    return this._token;
  }

  set token(value: string) {
    this._token = value;
  }
}
