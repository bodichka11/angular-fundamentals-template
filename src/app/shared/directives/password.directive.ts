import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { icon } from '@fortawesome/fontawesome-svg-core';

@Directive({
  selector: '[appPassword]',
})
export class PasswordDirective {
  private eyeIcon = icon(faEye).node[0];
  private eyeSlashIcon = icon(faEyeSlash).node[0];

  constructor(
    private el: ElementRef<HTMLInputElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    const input = this.el.nativeElement;
    this.renderer.addClass(input, 'input-wicon');

    const button: HTMLButtonElement = this.renderer.createElement('button');
    this.renderer.setProperty(button, 'type', 'button');
    this.renderer.addClass(button, 'input-wicon-button');
    this.appendIcon(button);
    this.renderer.listen(button, 'click', (event: Event) => {
      event.preventDefault();
      this.toggle(button);
    });

    const wrapperDiv: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(wrapperDiv, 'input-wicon-wrapper');

    const parent: HTMLElement = this.renderer.parentNode(input);
    this.renderer.insertBefore(parent, wrapperDiv, input);

    this.renderer.appendChild(wrapperDiv, input);
    this.renderer.appendChild(wrapperDiv, button);
  }

  toggle(button: HTMLButtonElement): void {
    const input = this.el.nativeElement;
    this.renderer.setProperty(
      input,
      'type',
      input.type === 'password' ? 'text' : 'password'
    );

    this.appendIcon(button);
  }

  appendIcon(button: HTMLButtonElement): void {
    const icon =
      this.el.nativeElement.type === 'password'
        ? this.eyeSlashIcon
        : this.eyeIcon;

    this.renderer.setProperty(button, 'innerHTML', '');
    this.renderer.appendChild(button, icon);
  }
}
