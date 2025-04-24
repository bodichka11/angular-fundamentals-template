import { Injectable } from '@angular/core';
import { Author } from '@app/models/author';
import { ApiResponse, Course } from '@app/models/course.models';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CoursesService } from './courses.service';

@Injectable({
    providedIn: 'root'
})
export class CoursesStoreService {
    private isLoading$$ = new BehaviorSubject<boolean>(false);
    private courses$$ = new BehaviorSubject<Course[]>([]);
    private authors$$ = new BehaviorSubject<Author[]>([]);
  
    public isLoading$ = this.isLoading$$.asObservable();
    public courses$ = this.courses$$.asObservable();
    public authors$ = this.authors$$.asObservable();
  
    constructor(private coursesService: CoursesService) {}
  
    getAll(): Observable<ApiResponse<Course[]>> {
      this.isLoading$$.next(true);
      return this.coursesService.getAll().pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.courses$$.next(response.result);
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    createCourse(course: Omit<Course, 'id' | 'creationDate'>): Observable<ApiResponse<Course>> {
      this.isLoading$$.next(true);
      return this.coursesService.createCourse(course).pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.getAll().subscribe();
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    getCourse(id: string): Observable<ApiResponse<Course>> {
      this.isLoading$$.next(true);
      return this.coursesService.getCourse(id).pipe(
        tap({
          next: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    editCourse(id: string, course: Omit<Course, 'id' | 'creationDate'>): Observable<ApiResponse<Course>> {
      this.isLoading$$.next(true);
      return this.coursesService.editCourse(id, course).pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.getAll().subscribe();
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    deleteCourse(id: string): Observable<ApiResponse<void>> {
      this.isLoading$$.next(true);
      return this.coursesService.deleteCourse(id).pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.getAll().subscribe();
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    filterCourses(searchText: string): Observable<ApiResponse<Course[]>> {
      this.isLoading$$.next(true);
      return this.coursesService.filterCourses(searchText).pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.courses$$.next(response.result);
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    getAllAuthors(): Observable<ApiResponse<Author[]>> {
      this.isLoading$$.next(true);
      return this.coursesService.getAllAuthors().pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.authors$$.next(response.result);
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    createAuthor(name: string): Observable<ApiResponse<Author>> {
      this.isLoading$$.next(true);
      return this.coursesService.createAuthor(name).pipe(
        tap({
          next: (response) => {
            if (response.successful) {
              this.getAllAuthors().subscribe();
            }
            this.isLoading$$.next(false);
          },
          error: () => this.isLoading$$.next(false)
        })
      );
    }
  
    getAuthorById(id: string): Observable<ApiResponse<Author>> {
      this.isLoading$$.next(true);
      return this.coursesService.getAuthorById(id).pipe(
        tap({
          next: () => this.isLoading$$.next(false),
          error: () => this.isLoading$$.next(false)
        })
      );
    }
}
