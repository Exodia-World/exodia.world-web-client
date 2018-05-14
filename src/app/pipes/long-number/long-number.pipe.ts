import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'longNumber'})
export class LongNumberPipe extends DecimalPipe implements PipeTransform {

  transform(value: number, digits?: string, locale?: string): string {
    if (value.toString().length > 9) {
      return value.toExponential(2);
    } else {
      return super.transform(value, digits, locale);
    }
  }

}
