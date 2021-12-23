import {Component, OnDestroy, OnInit} from '@angular/core';
import {Product} from "../shared/models/Product";
import {UserService} from "../shared/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy {

  public product: Product;
  public shoppingCart: Product[] = [];
  public userSub: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userSub = this.userService.userSubject.subscribe(() => {
      this.shoppingCart = this.userService.getShoppingCart();
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
