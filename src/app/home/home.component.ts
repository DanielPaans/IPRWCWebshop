import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {CategoryService} from "../shared/category.service";
import {Category} from "../shared/models/Category";
import {Observable, Subscription} from "rxjs";
import {Product} from "../shared/models/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public randomCategoryName = 'None';
  public columns = 3;

  private maxAmount = 6;
  private categorySub: Subscription;
  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.columns = window.innerWidth < 768 ? 2 : 3;

    this.categorySub = this.categoryService.categoriesObs.subscribe({
      next: categories => {
        this.randomCategoryName = categories[Math.floor(Math.random() * categories.length)].name;
        this.getProducts(this.randomCategoryName);
      }
    });
    this.categoryService.getCategories();
  }

  public getProducts(category: string): void {
    this.productService.getProducts('', category)
      .subscribe({
        next: results => {
          this.products = results.slice(0, this.maxAmount);
        }, error : err => {
          console.log(err);
        }
      })
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

}
