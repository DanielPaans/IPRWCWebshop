import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category} from "./models/Category";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private URL = environment.HTTP_CONFIG.CATEGORY_PATH;
  constructor(private http: HttpClient) { }

  public getCategories(): Category[] {
    let results: Category[] = [];
    this.http.get<Category[]>(this.URL).subscribe({
      next: categories => {
        categories.forEach(category => {
          results.push(category);
        });
      }
    });
    return results;
  }
}
