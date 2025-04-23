import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input() placeholder: string = 'Enter text';
  @Output() searchClicked = new EventEmitter<string>();

  inputValue: string = '';

  onSearchClick() {
    this.searchClicked.emit(this.inputValue.trim());
  }
}

