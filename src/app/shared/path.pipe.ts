import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {

  transform(value: string, path?: string): string {
    return path ? path + value : './assets/images/' + value;
  }

}
