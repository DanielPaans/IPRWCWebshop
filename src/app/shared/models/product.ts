import { Category } from "./Category";

export class Product {

  private _id: string;
  private _name: string;
  private _description: string;
  private _amount: number;
  private _price: number;
  private _categories: Category[];
  private _imagePath: string;

  constructor(id: string, name: string, description: string, amount: number, price: number, categories: Category[], imagePath: string) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._amount = amount;
    this._price = price;
    this._categories = categories;
    this._imagePath = imagePath;
  }


  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(value: number) {
    this._amount = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get categories(): Category[] {
    return this._categories;
  }

  set categories(value: Category[]) {
    this._categories = value;
  }

  get imagePath(): string {
    return this._imagePath;
  }

  set imagePath(value: string) {
    this._imagePath = value;
  }
}
