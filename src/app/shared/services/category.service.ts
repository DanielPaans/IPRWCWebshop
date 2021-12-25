import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category";
import {environment} from "../../../environments/environment";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories = new Subject<Category[]>();
  public categoriesObs = this.categories.asObservable();

  private URL = environment.HTTP_CONFIG.CATEGORY_PATH;
  constructor(private http: HttpClient) { }

  public getCategories(): void {
    this.http.get<Category[]>(this.URL).subscribe({
      next: categories => {
        this.categories.next(categories);
      }
    });
  }
}
