import {Component, Input, OnInit} from '@angular/core';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() items: Product[] = [];
  constructor() { }

  ngOnInit(): void {
    // this.items = [new Product('gitaar', 'Dit is een gitaar', 5, 149.5, [], 'guitar.jpg'),
    //   new Product('gitaar', 'Dit is een gitaar', 5, 149.5, [], 'guitar.jpg'),
    //   new Product('gitaar', 'Dit is een gitaar', 5, 149.5, [], 'guitar.jpg'),
    //   new Product('versterker', 'Dit is een gitaar', 5, 69, [], 'amplifier.jpg'),
    //   new Product('gitaar', 'Dit is een gitaar', 5, 149.5, [], 'guitar.jpg'),
    // ]
  }

  public fillList(products: Product[]): void {
    this.items = products;
  }


}
