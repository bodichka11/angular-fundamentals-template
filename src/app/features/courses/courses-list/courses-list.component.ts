import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.models';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { UserStoreService } from '@app/user/services/user-store.service';
import { combineLatestWith } from 'rxjs';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  courses: Course[] = [];
  editable = this.userStore.isAdmin;

  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService
  ) {}

  ngOnInit(): void {
    this.subscribeToServices();
  }

  private subscribeToServices(): void {
    this.coursesStore.courses$
      .pipe(combineLatestWith(this.coursesStore.authors$))
      .subscribe(([courses, authors]) => {
        this.courses = courses.map(course => ({
          ...course,
          creationDate: course.creationDate ? new Date(course.creationDate).toISOString() : new Date().toISOString(),
          authors: authors
            .filter(({ id }) => course.authors.includes(id))
            .map(({ name }) => name),
        }));
      });

    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors();
  }

  showCourse(courseId: string): void {
    this.coursesStore.getCourse(courseId);
    this.router.navigate(['/courses', courseId]);
  }

  addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  editCourse(id: string): void {
    this.router.navigate(['/courses/edit', id]);
  }

  deleteCourse(id: string): void {
    this.coursesStore.deleteCourse(id);
  }

  searchCourse(event: string): void {
    this.coursesStore.filterCourses(event);
  }

  trackByCourses(index: number, course: Course): string {
    return course.id || index.toString();
  }
}
