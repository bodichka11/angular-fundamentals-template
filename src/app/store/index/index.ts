import { ActionReducerMap } from "@ngrx/store";
import * as fromAuthors from "../authors/authors.reducer";
import { AuthorsEffects } from "../authors/authors.effects";
import * as fromCourses from "../courses/courses.reducer";
import { CoursesEffects } from "../courses/courses.effects";

export interface AppState {
  courses: fromCourses.CoursesState;
  authors: fromAuthors.AuthorsState;
}

export const reducers: ActionReducerMap<AppState> = {
  courses: fromCourses.reducer,
  authors: fromAuthors.reducer,
};

export const effects = [CoursesEffects, AuthorsEffects];
