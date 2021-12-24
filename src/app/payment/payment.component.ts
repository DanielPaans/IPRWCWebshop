import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../shared/models/Product";
import {UserService} from "../shared/services/user.service";
import {Subscription} from "rxjs";
import {SnackbarService} from "../shared/services/snackbar.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  public product: Product;
  public shoppingCart: Product[] = [];
  public userSub: Subscription;

  constructor(private userService: UserService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.shoppingCart = this.userService.getShoppingCart();
  }

  ngOnDestroy(): void {

  }

  public clearCart(): void {
    this.userService.clearCart();
    this.shoppingCart = [];
    this.snackbarService.affirmativeSnackbar("Shopping cart cleared", "OK");
  }

  public checkOut(): void {

  }

}
