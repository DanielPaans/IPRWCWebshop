import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../shared/product.service";
import {CategoryService} from "../shared/category.service";
import {Subscription} from "rxjs";
import {Product} from "../shared/models/Product";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public products: Product[] = [];
  public randomCategoryName = '';
  public recentlySearched: Product[] = [];
  public columns = 3;

  private maxAmount = 6;
  private categorySub: Subscription;
  constructor(private productService: ProductService, private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit(): void {
    this.recentlySearched = this.userService.getRecentlySearched(this.maxAmount);
    // this.recentlySearched = this.recentlySearched.slice(0, this.maxAmount);
    console.log(this.recentlySearched);
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

