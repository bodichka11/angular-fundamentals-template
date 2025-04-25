import { Action, createReducer, on } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";
import { Author } from "@app/models/author";

export const authorsFeatureKey = "authors";

export interface AuthorsState {
  allAuthors: Author[];
  author: Author | null;
  isAllAuthorsLoading: boolean;
  isSingleAuthorLoading: boolean;
  errorMessage: string | null;
}

export const initialState: AuthorsState = {
  allAuthors: [],
  author: null,
  isAllAuthorsLoading: false,
  isSingleAuthorLoading: false,
  errorMessage: null,
};

export const authorsReducer = createReducer(
  initialState,
  on(AuthorsActions.requestAllAuthors, (state) => ({
    ...state,
    isAllAuthorsLoading: true,
    errorMessage: null,
  })),
  on(AuthorsActions.requestAllAuthorsSuccess, (state, { authors }) => ({
    ...state,
    allAuthors: authors,
    isAllAuthorsLoading: false,
  })),
  on(AuthorsActions.requestAllAuthorsFail, (state, { error }) => ({
    ...state,
    isAllAuthorsLoading: false,
    errorMessage: error,
  })),
  on(AuthorsActions.requestSingleAuthor, (state) => ({
    ...state,
    isSingleAuthorLoading: true,
    errorMessage: null,
  })),
  on(AuthorsActions.requestSingleAuthorSuccess, (state, { author }) => ({
    ...state,
    author,
    isSingleAuthorLoading: false,
  })),
  on(AuthorsActions.requestSingleAuthorFail, (state, { error }) => ({
    ...state,
    isSingleAuthorLoading: false,
    errorMessage: error,
  })),
  on(AuthorsActions.requestCreateAuthor, (state) => ({
    ...state,
    errorMessage: null,
  })),
  on(AuthorsActions.requestCreateAuthorSuccess, (state, { author }) => ({
    ...state,
    allAuthors: [...state.allAuthors, author],
  })),
  on(AuthorsActions.requestCreateAuthorFail, (state, { error }) => ({
    ...state,
    errorMessage: error,
  }))
);

export const reducer = (
  state: AuthorsState | undefined,
  action: Action
): AuthorsState => authorsReducer(state, action);
