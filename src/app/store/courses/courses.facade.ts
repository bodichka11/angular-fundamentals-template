import { Injectable } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { CoursesState } from "./courses.reducer";
import * as CoursesSelectors from "./courses.selectors";
import * as CourseActions from "./courses.actions";

@Injectable({
  providedIn: "root",
})
export class CoursesStateFacade {
  constructor(private store: Store<CoursesState>) {}

  isAllCoursesLoading$ = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );
  isSingleCourseLoading$ = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );
  courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  courseWithAuthorsNames$ = this.store.pipe(
    select(CoursesSelectors.getCourseWithAuthorsNames)
  );
  allCoursesWithAuthorsNames$ = this.store.pipe(
    select(CoursesSelectors.getAllCoursesWithAuthorsNames)
  );
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  getAllCourses(): void {
    this.store.dispatch(CourseActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CourseActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CourseActions.requestFilteredCourses({ title: searchValue })
    );
  }

  editCourse(body: any, id: string): void {
    this.store.dispatch(CourseActions.requestEditCourse({ id, course: body }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CourseActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CourseActions.requestDeleteCourse({ id }));
  }
}
