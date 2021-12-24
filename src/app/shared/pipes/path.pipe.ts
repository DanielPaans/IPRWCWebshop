import { Pipe, PipeTransform } from '@angular/core';
import {environment} from "../../../environments/environment";

@Pipe({
  name: 'path'
})
export class PathPipe implements PipeTransform {

  transform(value: string, path?: string): string {
    return path ? path + value : environment.PATH + value;
  }

}
