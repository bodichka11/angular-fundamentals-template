import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private authService: AuthService, private router: Router) {}
  
    canLoad(): boolean | UrlTree | Observable<boolean | UrlTree> {
      return this.authService.isAuthorized || this.router.createUrlTree(['/login']);
    }
  }
