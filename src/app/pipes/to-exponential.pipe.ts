import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({name: 'toExponential'})
export class ToExponentialPipe extends DecimalPipe implements PipeTransform {
  transform(value: number, digits?: string, locale?: string): string {
    return value.toString().length > 9 ? value.toExponential(2) : super.transform(value, '1.0-3');
  }
}