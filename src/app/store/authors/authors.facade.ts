import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as AuthorsActions from "./authors.actions";
import * as AuthorSelectors from "./authors.selectors";
import { AuthorsState } from "./authors.reducer";

@Injectable({
  providedIn: "root",
})
export class AuthorsFacade {
  constructor(private store: Store<AuthorsState>) {}

  isAllAuthorsLoading$ = this.store.pipe(
    select(AuthorSelectors.isAllAuthorsLoadingSelector)
  );
  isSingleAuthorLoading$ = this.store.pipe(
    select(AuthorSelectors.isSingleAuthorLoadingSelector)
  );
  authors$ = this.store.pipe(select(AuthorSelectors.getAllAuthors));
  author$ = this.store.pipe(select(AuthorSelectors.getAuthor));
  errorMessage$ = this.store.pipe(select(AuthorSelectors.getErrorMessage));

  getAllAuthors(): void {
    this.store.dispatch(AuthorsActions.requestAllAuthors());
  }

  getAuthorById(id: string): void {
    this.store.dispatch(AuthorsActions.requestSingleAuthor({ id }));
  }

  createAuthor(name: string): void {
    this.store.dispatch(AuthorsActions.requestCreateAuthor({ name }));
  }
}
