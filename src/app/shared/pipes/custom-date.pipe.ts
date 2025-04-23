import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
    transform(value: Date | string | null | undefined): string {
        if (!value) {
          return '';
        }
        const date = value instanceof Date ? value : new Date(value);
        if (isNaN(date.getTime())) {
          return '';
        }
    
        const dd = date.getDate().toString().padStart(2, '0');
        const mm = (date.getMonth() + 1).toString().padStart(2, '0');
        const yyyy = date.getFullYear();
    
        return `${dd}.${mm}.${yyyy}`;
      }
}
