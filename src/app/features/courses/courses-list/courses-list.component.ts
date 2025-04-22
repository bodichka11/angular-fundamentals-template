import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() courses: any[] = [];
  @Input() editable: boolean = false;

  @Output() showCourse = new EventEmitter<string>();
  @Output() editCourse = new EventEmitter<string>();
  @Output() deleteCourse = new EventEmitter<string>();

  onShow(id: string): void {
    this.showCourse.emit(id);
  }

  onEdit(id: string): void {
    this.editCourse.emit(id);
  }

  onDelete(id: string): void {
    this.deleteCourse.emit(id);
  }
}
