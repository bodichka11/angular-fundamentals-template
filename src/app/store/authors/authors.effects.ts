import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, exhaustMap, map, mergeMap } from "rxjs/operators";
import * as AuthorsActions from "./authors.actions";
import { CoursesService } from "@app/services/courses.service";

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestAllAuthors),
      exhaustMap(() =>
        this.coursesService.getAllAuthors().pipe(
          map((res) =>
            AuthorsActions.requestAllAuthorsSuccess({
              authors: res.result || [],
            })
          ),
          catchError((error) =>
            of(AuthorsActions.requestAllAuthorsFail({ error }))
          )
        )
      )
    )
  );

  getSpecificAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestSingleAuthor),
      mergeMap((action) =>
        this.coursesService.getAuthorById(action.id).pipe(
          map((res) =>
            AuthorsActions.requestSingleAuthorSuccess({ author: res.result! })
          ),
          catchError((error) =>
            of(AuthorsActions.requestSingleAuthorFail({ error }))
          )
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestCreateAuthor),
      mergeMap((action) =>
        this.coursesService.createAuthor(action.name).pipe(
          map((res) =>
            AuthorsActions.requestCreateAuthorSuccess({ author: res.result! })
          ),
          catchError((error) =>
            of(AuthorsActions.requestCreateAuthorFail({ error }))
          )
        )
      )
    )
  );
}
