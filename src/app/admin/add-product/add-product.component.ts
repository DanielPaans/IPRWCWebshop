import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ProductService} from "../../shared/services/product.service";
import {Product} from "../../shared/models/Product";
import {Category} from "../../shared/models/Category";
import {CategoryService} from "../../shared/services/category.service";
import {ImageService} from "../../shared/services/image.service";
import {SnackbarService} from "../../shared/services/snackbar.service";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('f') form: NgForm;
  public categories: Category[] = [];
  public selectedCategory: Category = null;
  private image: File;

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private imageService: ImageService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.categoryService.getCategories();
    this.categoryService.categoriesObs.subscribe({
      next: categories => {
        this.categories = categories;
      }, error: err => {
        console.log(err);
      }
    });
  }

  public cancel(): void {
    this.form.reset();
  }

  public checkFile(fileEvent: any): void {
    const file: File = fileEvent.target.files[0];
    if (file.type.startsWith('image/')) {
      this.image = file;
    }
  }

  public onSubmit() {
    this.addProduct();
  }

  private addProduct() {
    const formValue = this.form.value;
    const categories = [formValue.category];
    const product = { "name": formValue.name,
      "description": formValue.description,
      "amount": formValue.amount,
      "price": formValue.price,
      "categories": categories,
      "imagePath": this.image.name }
    this.productService.postProduct(product).subscribe({
      next: () => {
        this.saveImage();
        this.snackbarService.affirmativeSnackbar("Product added", "OK");
        this.form.reset();
      }, error: err => {
        console.log(err);
        this.snackbarService.errorSnackbar("Something went wrong", "OK");
      }
    });
  }

  private saveImage() {
    this.imageService.uploadImage(this.image);
  }



}
