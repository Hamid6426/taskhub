import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat',
  standalone: true
})
export class DateFormatPipe implements PipeTransform {
  transform(value: Date | string, format: string = 'mediumDate', locale: string = 'en-US'): string {
    if (!value) return '';
    const date = typeof value === 'string' ? new Date(value) : value;
    return formatDate(date, format, locale);
  }
}
