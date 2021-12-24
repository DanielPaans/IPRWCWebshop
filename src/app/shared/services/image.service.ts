import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  public uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    this.http.post(environment.HTTP_CONFIG.IMAGE_PATH, formData).subscribe({
      next: value => {
        console.log(value);
      }, error: err => {
        console.log(err);
      }
    });
  }

  public deleteImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
  }
}
