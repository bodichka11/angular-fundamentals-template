import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userStore.isAdmin) {
      return true;
    }
    return this.router.parseUrl("/courses");
  }
}
