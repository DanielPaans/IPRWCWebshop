import {Product} from "../../shared/models/Product";
import {Component, Input, OnInit} from "@angular/core";
import {UserService} from "../../shared/services/user.service";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  @Input() item: Product
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  public deleteItem() {
    this.userService.removeFromCart(this.item);
  }

}
