import {Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Product} from "../shared/models/product";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../shared/services/snackbar.service";
import {Router} from "@angular/router";
import {OrderService} from "../shared/services/order.service";
import {ShoppingCartItemComponent} from "./shopping-cart-item/shopping-cart-item.component";
import {Order} from "../shared/models/order";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  public product: Product;
  public shoppingCart: Product[] = [];
  public totalPrice: number = 0;
  public userSub: Subscription;
  public startCheckout = false;
  public loggingIn = false;

  @ViewChildren(ShoppingCartItemComponent) private shoppingCartItems: QueryList<ShoppingCartItemComponent>;

  constructor(private userService: UserService, private snackbarService: SnackbarService,
              private orderService: OrderService) { }

  ngOnInit(): void {
    this.update();
    this.userSub = this.userService.user.subscribe(() => {
      this.update();
    });
  }

  private update(): void {
    this.shoppingCart = this.userService.getShoppingCart();
    setTimeout(() => {
      this.getTotalPrice();
    }, 500);
  }

  private getTotalPrice(): void {
    let totalPrice: number = 0;
    this.shoppingCart.forEach(product => {
      totalPrice += product.price;
    });
    this.totalPrice = totalPrice;
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  public clearCart(): void {
    this.userService.clearCart();
    this.shoppingCart = [];
    this.snackbarService.affirmativeSnackbar("Shopping cart cleared", "OK");
  }

  public checkOut(): void {
    this.startCheckout = true;
    this.orderService.placeOrder(this.createOrder()).subscribe({
      next: () => {
        this.userService.clearCart();
        this.snackbarService.affirmativeSnackbar("Check out successful", "OK")
      }, error: err => {
        if (err === "Not logged in") {
          this.loggingIn = true;
        }
      }
    });

  }

  private createOrder(): Order {
    const orderItems: {productId: string, amount: number}[] = [];
    this.shoppingCartItems.forEach(item => {
      orderItems.push({productId: item.item.id, amount: item.amount});
    });

    return new Order(orderItems, this.userService.user.value.id);
  }

  public stopLoggingIn(): void {
    this.loggingIn = false;
  }
}
