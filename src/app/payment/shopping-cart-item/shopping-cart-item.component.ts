import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/Product";

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit {

  // @Input item: Product
  constructor() { }

  ngOnInit(): void {
  }

}
