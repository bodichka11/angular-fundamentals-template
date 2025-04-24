import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { CoursesModule } from './features/courses/courses.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { WINDOW } from './shared/tokens/window.token';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { AdminGuard } from './user/guards/admin.guard';


const routes: Routes = [
    { path: 'login', component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'registration', component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
    { path: 'courses', component: CoursesListComponent, canLoad: [AuthorizedGuard] },
    { path: 'courses/add', component: CourseFormComponent, canLoad: [AuthorizedGuard], canActivate: [AdminGuard] },
    { path: 'courses/:id', component: CourseInfoComponent, canLoad: [AuthorizedGuard], canActivate: [AdminGuard] },
    { path: 'courses/edit/:id', component: CourseFormComponent, canLoad: [AuthorizedGuard] },
    { path: '**', redirectTo: 'courses' },
  ];


@NgModule({
  declarations: [
    AppComponent,
    CourseInfoComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  exports: [FontAwesomeModule,],
  providers: [AuthorizedGuard, NotAuthorizedGuard, CoursesService, CoursesStoreService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: WINDOW,
      useValue: window
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
