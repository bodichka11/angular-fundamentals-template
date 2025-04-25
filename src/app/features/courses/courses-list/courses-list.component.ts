import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '@app/models/course.models';
import { AuthorsFacade } from '@app/store/authors/authors.facade';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { UserStoreService } from '@app/user/services/user-store.service';


@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  constructor(
    private router: Router,
    private userStore: UserStoreService,
    public coursesFacade: CoursesStateFacade,
    public authorsFacade: AuthorsFacade,
  ) {}

  editable = this.userStore.isAdmin;
  courses$ = this.coursesFacade.allCoursesWithAuthorsNames$;

  ngOnInit(): void {
    this.subscribeToServives();
  }

  private subscribeToServives(): void {
    this.authorsFacade.getAllAuthors();
    this.coursesFacade.getAllCourses();
  }

  showCourse(courseId: string): void {
    this.coursesFacade.getSingleCourse(courseId);
    this.router.navigate(['/courses', courseId]);
  }

  addCourse(): void {
    this.router.navigate(['/courses/add']);
  }

  editCourse(id: string): void {
    this.coursesFacade.getSingleCourse(id);
    this.router.navigate(['/courses/edit', id]);
  }

  deleteCourse(id: string): void {
    this.coursesFacade.deleteCourse(id);
  }

  searchCourse(event: string): void {
    this.coursesFacade.getFilteredCourses(event);
  }

  trackByCourses(index: number, course: Course): string {
    return course.id || index.toString();
  }
}
