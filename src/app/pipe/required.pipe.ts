import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Required',
})
export class RequiredPipe implements PipeTransform {
  transform(value: string): string {
    return value + ' *';
  }
}
