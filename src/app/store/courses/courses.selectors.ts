import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState, coursesFeatureKey } from "./courses.reducer";
import { authorIdsToNames } from "@app/helpers/authorIdsToNames";
import { getAllAuthors } from "../authors/authors.selectors";

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  selectCoursesState,
  (state) => state.isSearchState
);

export const isSingleCourseLoadingSelector = createSelector(
  selectCoursesState,
  (state) => state.isSingleCourseLoading
);

export const getCourses = createSelector(
  selectCoursesState,
  (state) => state.allCourses
);

export const getAllCourses = createSelector(
  selectCoursesState,
  (state) => state.allCourses
);

export const getCourse = createSelector(
  selectCoursesState,
  (state) => state.course
);

export const getCourseWithAuthorsNames = createSelector(
  getCourse,
  getAllAuthors,
  (course, authors) =>
    course && authors ? authorIdsToNames(course, authors) : course
);

export const getAllCoursesWithAuthorsNames = createSelector(
  getAllCourses,
  getAllAuthors,
  (courses, authors) =>
    courses && authors
      ? courses.map((course) => authorIdsToNames(course, authors))
      : courses
);

export const getErrorMessage = createSelector(
  selectCoursesState,
  (state) => state.errorMessage
);
