import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
 @Input() placeholder: string = '';
 @Output() search = new EventEmitter<string>();

 query: string = '';

 onSubmit(form: NgForm): void {
   this.search.emit(this.query.trim());
   form.resetForm();
 }
}

