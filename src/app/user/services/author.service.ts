import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Author } from "@app/models/author";
import { mockedAuthorsList } from "@app/shared/mocks/mocks";
import { Observable, of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class AuthorsService {
  readonly defaultUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(`${this.defaultUrl}/authors/all`);
  }
}
