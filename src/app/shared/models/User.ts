import {Product} from "./Product";

export class User {

  private _recentlySearched: Set<string>;
  private _shoppingCart: Set<string>;
  private _username: string;
  private _password: string;
  private _email: string;


  constructor(recentlySearched: Set<string> = new Set<string>(), shoppingCart: Set<string> = new Set<string>(), username: string = '', password: string = '', email: string = '') {
    this._recentlySearched = recentlySearched;
    this._shoppingCart = shoppingCart;
    this._username = username;
    this._password = password;
    this._email = email;
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

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
