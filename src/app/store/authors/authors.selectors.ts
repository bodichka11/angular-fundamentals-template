import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorsState, authorsFeatureKey } from "./authors.reducer";

export const selectAuthorsState =
  createFeatureSelector<AuthorsState>(authorsFeatureKey);

export const isAllAuthorsLoadingSelector = createSelector(
  selectAuthorsState,
  (state) => state.isAllAuthorsLoading
);

export const isSingleAuthorLoadingSelector = createSelector(
  selectAuthorsState,
  (state) => state.isSingleAuthorLoading
);

export const getAllAuthors = createSelector(
  selectAuthorsState,
  (state) => state.allAuthors
);

export const getAuthor = createSelector(
  selectAuthorsState,
  (state) => state.author
);

export const getErrorMessage = createSelector(
  selectAuthorsState,
  (state) => state.errorMessage
);
