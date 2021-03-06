import {AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../shared/services/product.service";
import {CategoryService} from "../shared/services/category.service";
import {Subscription} from "rxjs";
import {Product} from "../shared/models/product";
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterContentInit, OnDestroy {

  public products: Product[] = [];
  public randomCategoryName = '';
  public recentlySearched: Product[] = [];
  public columns = 3;
  public isMobile = false;
  public username;

  private maxAmount = 6;
  private categorySub: Subscription;
  constructor(private productService: ProductService, private categoryService: CategoryService, private userService: UserService) { }


  ngOnInit(): void {
    this.recentlySearched = this.userService.getRecentlySearched(this.maxAmount);
    this.username = this.userService.user.value.username;

    this.categorySub = this.categoryService.categoriesObs.subscribe({
      next: categories => {
        this.randomCategoryName = categories[Math.floor(Math.random() * categories.length)].name;
        this.getProducts(this.randomCategoryName);
      }
    });
    this.categoryService.getCategories();
  }

  ngAfterContentInit(): void {
    this.isMobile = window.screen.width <= 600;
    this.columns = window.innerWidth < 768 ? 2 : 3;
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

