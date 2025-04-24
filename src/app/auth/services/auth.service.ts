import { Injectable } from '@angular/core';
import { LoginResponse } from '@app/models/loginResponse';
import { SessionStorageService } from './session-storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    readonly defaultApi = environment.apiUrl;
    private isAuthorized$$ = new BehaviorSubject<boolean>(false);
    public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    const token = this.sessionStorage.getToken();
    this.isAuthorized = !!token;
  }

  login(user: { email: string; password: string }) {
    return this.http.post<LoginResponse>(`${this.defaultApi}/login`, user).pipe(
      tap(response => {
        this.sessionStorage.setToken(response.accessToken);
        this.isAuthorized$$.next(true);
      })
    );
  }

  logout() {
    return this.http.post(`${this.defaultApi}/logout`, {}).pipe(
      tap(() => {
        this.sessionStorage.deleteToken();
        this.isAuthorized$$.next(false);
        this.router.navigate(['/login']);
      })
    );
  }

  register(user: { email: string; password: string; name: string }) {
    return this.http.post(`${this.defaultApi}/register`, user);
  }

  get isAuthorized() {
    return this.isAuthorized$$.value;
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    return '/login';
  }
}
