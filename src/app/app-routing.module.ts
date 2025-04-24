import { Routes } from '@angular/router';
import { CourseFormComponent, LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { CourseInfoComponent } from './features/course-info/course-info.component';

const routes: Routes = [
    { path: 'login', component: LoginFormComponent },
    { path: 'registration', component: RegistrationFormComponent },
    { path: 'courses', component: CoursesListComponent },
    { path: 'courses/add', component: CourseFormComponent },
    { path: 'courses/:id', component: CourseInfoComponent },
    { path: 'courses/edit/:id', component: CourseFormComponent },
    { path: '', pathMatch: 'full', redirectTo: 'courses' },
    { path: '**', redirectTo: 'courses' },
  ];
