import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  constructor(
    private router: Router,
    public coursesFacade: CoursesStateFacade,
  ) {}

  @Input() id = '';

  course$ = this.coursesFacade.courseWithAuthorsNames$;

  onBack(): void {
    this.router.navigate(['/courses']);
}
}
