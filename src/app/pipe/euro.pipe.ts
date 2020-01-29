import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Euro',
})
export class EuroPipe implements PipeTransform {
  transform(value: number | string): string {
    if (!value && value !== 0) {
      return;
    }

    const valueAsNumber = Number(value);
    let transformedValue: string;

    if (valueAsNumber % 1 !== 0) {
      transformedValue = valueAsNumber.toFixed(2).toString();
    } else {
      transformedValue = valueAsNumber + '.00';
    }
    return transformedValue + ' €';
  }
}
