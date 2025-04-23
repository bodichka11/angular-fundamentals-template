import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (value == null || isNaN(value)) {
          return '';
        }
        const hours = Math.floor(value / 60);
        const minutes = value % 60;
        const pad = (n: number) => n.toString().padStart(2, '0');
    
        const hh = pad(hours);
        const mm = pad(minutes);

        const suffix = hours > 1 ? 'hours' : 'hour';
        return `${hh}:${mm} ${suffix}`;
      }
}
