import {Product} from "../../shared/models/product";
import {Component, Input, OnInit, Output} from "@angular/core";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() item: Product
  public amount: number = 1;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public deleteItem(): void {
    this.userService.removeFromCart(this.item);
  }

  public setAmount(event: Event): void {
    this.amount = Number((event.target as HTMLInputElement).value);
  }

}
