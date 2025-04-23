import { Injectable } from '@angular/core';
import { Author } from '@app/models/author';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthorsService {
  getAll(): Observable<Author[]> {
    return of(mockedAuthorsList);
  }
}
