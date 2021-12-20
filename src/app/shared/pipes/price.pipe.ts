import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(price: number, commaSeperated: boolean = true): string {
    let newPrice = price.toFixed(2);

    // Check if number is integer
    if (price % 1 === 0) {
      newPrice = price.toString() + '.-';
    }

    if (commaSeperated) {
      newPrice = newPrice.replace('.', ',');
    }
    return newPrice;
  }


}
