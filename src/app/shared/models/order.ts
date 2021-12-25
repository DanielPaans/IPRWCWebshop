export class Order {

  private _orderItems: {productId: string, amount: number}[];
  private _userId: string;


  constructor(orderItems: { productId: string; amount: number }[], userId: string) {
    this._orderItems = orderItems;
    this._userId = userId;
  }

  get orderItems(): { productId: string; amount: number }[] {
    return this._orderItems;
  }

  set orderItems(value: { productId: string; amount: number }[]) {
    this._orderItems = value;
  }

  get userId(): string {
    return this._userId;
  }

  set userId(value: string) {
    this._userId = value;
  }
}
