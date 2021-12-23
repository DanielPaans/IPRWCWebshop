import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product} from "../shared/models/Product";
import {Category} from "../shared/models/Category";
import {NgForm} from "@angular/forms";
import {ProductService} from "../shared/product.service";
import {CategoryService} from "../shared/category.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit, OnDestroy {

  public selectedCategory = 'All';
  public categories: Category[] = [];
  public products: Product[] = [];
  @ViewChild('f') form: NgForm;
  public keyword = '';
  public columns = 3;

  private categorySub: Subscription;

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.columns = window.innerWidth < 600 ? 1 : window.innerWidth < 768 ? 2 : 3;

    this.getProducts();
    this.getCategories();
  }

  public getCategories(): void {
    this.categorySub = this.categoryService.categoriesObs.subscribe({
      next: value => {
        this.categories = value;
      }
    });

    this.categoryService.getCategories();
  }

  public getProducts(): void {
    this.productService.getProducts(this.keyword, (this.selectedCategory === 'All') ? null : this.selectedCategory)
      .subscribe({
      next: results => {
        this.products = results;
      }, error : err => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }
}
