import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/Product";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ProductService} from "../../shared/services/product.service";
import {SnackbarService} from "../../shared/services/snackbar.service";
import {UserService} from "../../shared/services/user.service";
import {Role} from "../../shared/role";
import {ImageService} from "../../shared/services/image.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  @Input() public product: Product = new Product('','','',0,0, null, '');
  public suggestions: Product[] = [];
  public suggestItems = 4;
  public isAdmin = false;

  constructor(private route: ActivatedRoute, private productService: ProductService,
              private snackbarService: SnackbarService, private userService: UserService, private router: Router,
              private imageService: ImageService) { }

  ngOnInit(): void {
    this.suggestItems = window.innerWidth < 768 ? 3 : 4;

    this.route.params.subscribe({
      next: (params: Params) => {
        this.productService.getProduct(params['id']).subscribe({
          next: value => {
            this.product = value;
            this.getSuggestions();
            this.setStock();
            this.userService.addToRecentlySearched(this.product);
          },
          error: err => {
            console.log(err);
          }
        })
      }
    });

    this.userService.user.subscribe({
      next: user => {
        this.isAdmin = user.role === Role.ADMIN;
      }, error: err => {
        console.log(err);
      }
    });
  }

  private getSuggestions(): void {
    const randomCategory = this.product.categories[Math.floor(Math.random() * this.product.categories.length)].name
    this.productService.getProducts('', randomCategory).subscribe({
      next: value => {
        // filter current product out of suggestions
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
    this.userService.addToCart(this.product);
    this.snackbarService.affirmativeSnackbar(`Added ${this.product.name} to cart`, 'OK');
  }

  public deleteProduct() {
    this.productService.deleteProduct(this.route.snapshot.url[1].path).subscribe({
      next: value => {
        this.router.navigate(["/shop"]);
        console.log(value);
      }, error: err => {
        console.log(err);
      }
    });
  }
}
