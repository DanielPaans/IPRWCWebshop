import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";
import {ActivatedRoute, Params} from "@angular/router";
import {ProductService} from "../../shared/product.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() public product: Product = new Product('','','',0,0, null, '');
  public suggestions: Product[] = [];

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params: Params) => {
        this.productService.getProduct(params['id']).subscribe({
          next: value => {
            this.product = value;
            this.getSuggestions();
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
        this.suggestions = value;
      }, error: err => {
        console.log(err);
      }
    });

  }

}
