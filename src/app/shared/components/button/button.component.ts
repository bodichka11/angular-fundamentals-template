import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText: string = '';
  @Input() icon!: IconProp;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
