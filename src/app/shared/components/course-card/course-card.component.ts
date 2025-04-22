import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() creationDate!: Date;
  @Input() duration!: number;
  @Input() authors: string[] = [];
  @Input() editable = false;

  @Output() clickOnShow = new EventEmitter<void>();

  onShow(): void {
    this.clickOnShow.emit();
  }
}
// function Output(): (target: CourseCardComponent, propertyKey: "clickOnShow") => void {
//   throw new Error('Function not implemented.');
// }

