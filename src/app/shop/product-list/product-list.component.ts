import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import { Product } from '../../shared/models/Product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  @Input() items: Product[] = [];
  @Input() columns: number = 3;

  constructor() { }

  ngOnInit(): void {  }

  ngAfterViewInit(): void {
    try {
      setTimeout(() => {
        let grid = document.getElementById('product-list');
        grid.style.setProperty('grid-template-columns', `repeat(${this.columns}, minmax(0, 1fr)`);
      }, 500);
    } catch (e) { }
  }


}
