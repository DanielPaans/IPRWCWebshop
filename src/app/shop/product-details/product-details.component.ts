import {Component, HostListener, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../shared/product.service";
import {SnackbarService} from "../../shared/snackbar.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() public product: Product = new Product('','','',0,0, null, '');
  public suggestions: Product[] = [];
  public suggestItems = 4;

  constructor(private route: ActivatedRoute, private productService: ProductService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {

    this.suggestItems = window.innerWidth < 768 ? 3 : 4

    this.route.params.subscribe({
      next: (params: Params) => {
        this.productService.getProduct(params['id']).subscribe({
          next: value => {
            this.product = value;
            this.getSuggestions();
            this.setStock();
          },
          error: err => {
            console.log(err);
          }
        })
      }
    });
  }

  private getSuggestions(): void {
    const randomCategory = this.product.categories[Math.floor(Math.random() * this.product.categories.length)].name
    this.productService.getProducts('', randomCategory).subscribe({
      next: value => {
        value = value.filter(item => this.product.id !== item.id);
        this.suggestions = value.slice(0, this.suggestItems);
      }, error: err => {
        console.log(err);
      }
    });
  }

  private setStock() {
    const inStock: boolean = this.product.amount > 0;
    const stock: HTMLElement = document.getElementById('stock');
    stock.innerText = inStock ? 'In stock' : 'Out of stock';
    stock.style.setProperty('--background', `${inStock ? 'green' : '#b82418'}`);
  }

  public addToCart() {
    this.snackbarService.affirmativeSnackbar(`Added ${this.product.name} to cart`, 'OK');
    //TODO: Add to cart for real
  }

}
