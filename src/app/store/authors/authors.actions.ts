import { createAction, props } from "@ngrx/store";
import { Author } from "@app/models/author";
import { AuthorsConstants } from "./authors.constants";

export const requestAllAuthors = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS
);
export const requestAllAuthorsSuccess = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS_SUCCESS,
  props<{ authors: Author[] }>()
);
export const requestAllAuthorsFail = createAction(
  AuthorsConstants.REQUEST_ALL_AUTHORS_FAIL,
  props<{ error: any }>()
);
export const requestSingleAuthor = createAction(
  AuthorsConstants.REQUEST_SINGLE_AUTHOR,
  props<{ id: string }>()
);
export const requestSingleAuthorSuccess = createAction(
  AuthorsConstants.REQUEST_SINGLE_AUTHOR_SUCCESS,
  props<{ author: Author }>()
);
export const requestSingleAuthorFail = createAction(
  AuthorsConstants.REQUEST_SINGLE_AUTHOR_FAIL,
  props<{ error: any }>()
);
export const requestCreateAuthor = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR,
  props<{ name: string }>()
);
export const requestCreateAuthorSuccess = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR_SUCCESS,
  props<{ author: Author }>()
);
export const requestCreateAuthorFail = createAction(
  AuthorsConstants.REQUEST_CREATE_AUTHOR_FAIL,
  props<{ error: any }>()
);
