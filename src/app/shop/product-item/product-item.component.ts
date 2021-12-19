import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Product} from "../../shared/models/product";

interface RGB {
  r: number;
  g: number;
  b: number;
}
@Component({
  selector: 'app-product',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit, AfterViewInit {

  @Input() item: Product;

  constructor() {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    const prices = document.getElementsByTagName('h4') as HTMLCollectionOf<HTMLElement>;

    setTimeout(() => {
      const images = document.getElementsByClassName('card-img');
      for (let i = 0; i < images.length; i++) {
        const rgb: RGB = this.averageColor(images[i]);
        const brightness = this.brightnessByRGB(rgb);
        if(this.isBrightEnough(brightness)) {
          prices[i].className = 'dark';
        } else {
          prices[i].className = 'light';
        }
      }
    }, 500);
  }

  private averageColor(imageElement): RGB {

    let canvas: HTMLCanvasElement = document.createElement('canvas'),
      context: CanvasRenderingContext2D = canvas.getContext && canvas.getContext('2d'),
      imgData, width, height, length,
      rgb: RGB = {r: 0, g: 0, b: 0},
      count: number = 0;

    height = canvas.height =
      imageElement.naturalHeight ||
      imageElement.offsetHeight ||
      imageElement.height;
    width = canvas.width =
      imageElement.naturalWidth ||
      imageElement.offsetWidth ||
      imageElement.width;

    context.drawImage(imageElement, 0, 0);

    const searchSize = 200;
    imgData = context.getImageData(
      width - searchSize, height - searchSize, searchSize, searchSize);

    length = imgData.data.length;

    for (let i = 0; i < length; i += 4) {
      rgb.r += imgData.data[i];
      rgb.g += imgData.data[i + 1];
      rgb.b += imgData.data[i + 2];

      count++;
    }

    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);

    return rgb;
  }

  private brightnessByRGB(color: RGB): number {
    return (color.r * 299 + color.g * 587 + color.b * 114) / 1000;
  }

  private isBrightEnough(brightness: number): boolean {
    return brightness > 255/2;
  }
}
