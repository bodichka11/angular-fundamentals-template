import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as CourseActions from "./courses.actions";
import { CoursesService } from "@app/services/courses.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  exhaustMap,
  map,
  catchError,
  of,
  switchMap,
  forkJoin,
  mergeMap,
} from "rxjs";
import { Course } from "@app/models/course.models";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestAllCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((res) =>
            CourseActions.requestAllCoursesSuccess({
              courses: res.result || [],
            })
          ),
          catchError((error) =>
            of(CourseActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestFilteredCourses),
      switchMap((action) => {
        const { title } = action;

        const titleQuery = `title=${title}`;
        const durationQuery = `duration=${title}`;
        const descriptionQuery = `description=${title}`;
        const creationDateQuery = `creationDate=${title}`;

        const titleSearch$ = this.coursesService.filterCourses(titleQuery);
        const durationSearch$ =
          this.coursesService.filterCourses(durationQuery);
        const descriptionSearch$ =
          this.coursesService.filterCourses(descriptionQuery);
        const creationDateSearch$ =
          this.coursesService.filterCourses(creationDateQuery);

        return forkJoin([
          titleSearch$,
          durationSearch$,
          descriptionSearch$,
          creationDateSearch$,
        ]).pipe(
          map((results) => {
            const combinedResults = results.flatMap((el) => el.result || []);
            combinedResults.sort((a, b) =>
              (a.id ?? "").localeCompare(b.id ?? "")
            );
            const uniqueResults = combinedResults.reduce(
              (acc: Course[], el: Course, i: number) => {
                if (
                  i === 0 ||
                  (i >= 1 && el.id !== combinedResults[i - 1].id)
                ) {
                  return [...acc, el];
                }

                return acc;
              },
              []
            );

            return CourseActions.requestFilteredCoursesSuccess({
              courses: uniqueResults,
            });
          }),
          catchError((error) =>
            of(CourseActions.requestFilteredCoursesFail({ error }))
          )
        );
      })
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((res) =>
            CourseActions.requestSingleCourseSuccess({ course: res.result! })
          ),
          catchError((error) =>
            of(CourseActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          switchMap(() => [CourseActions.requestAllCourses()]),
          catchError((error) =>
            of(CourseActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map(() =>
            CourseActions.requestEditCourseSuccess({ course: action.course })
          ),
          catchError((error) =>
            of(CourseActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map(() =>
            CourseActions.requestCreateCourseSuccess({ course: action.course })
          ),
          catchError((error) =>
            of(CourseActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CourseActions.requestCreateCourseSuccess,
          CourseActions.requestEditCourseSuccess,
          CourseActions.requestSingleCourseFail
        ),
        map(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );
}
