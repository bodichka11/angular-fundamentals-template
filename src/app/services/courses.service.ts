import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, Author, Course } from '@app/models/course.models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    private apiUrl = environment.apiUrl;
    private coursesEndpoint = `${this.apiUrl}/courses`;
    private authorsEndpoint = `${this.apiUrl}/authors`;
  
    constructor(private http: HttpClient) {}
  
    getAll(): Observable<ApiResponse<Course[]>> {
      return this.http.get<ApiResponse<Course[]>>(`${this.coursesEndpoint}/all`);
    }
  
    createCourse(course: Omit<Course, 'id' | 'creationDate'>): Observable<ApiResponse<Course>> {
      return this.http.post<ApiResponse<Course>>(`${this.coursesEndpoint}/add`, course);
    }
  
    getCourse(id: string): Observable<ApiResponse<Course>> {
      return this.http.get<ApiResponse<Course>>(`${this.coursesEndpoint}/${id}`);
    }
  
    editCourse(id: string, course: Omit<Course, 'id' | 'creationDate'>): Observable<ApiResponse<Course>> {
      return this.http.put<ApiResponse<Course>>(`${this.coursesEndpoint}/${id}`, course);
    }
  
    deleteCourse(id: string): Observable<ApiResponse<void>> {
      return this.http.delete<ApiResponse<void>>(`${this.coursesEndpoint}/${id}`);
    }
  
    filterCourses(searchText: string): Observable<ApiResponse<Course[]>> {
      return this.http.get<ApiResponse<Course[]>>(
        `${this.coursesEndpoint}/filter`,
        { params: { search: searchText } }
      );
    }
  
    getAllAuthors(): Observable<ApiResponse<Author[]>> {
      return this.http.get<ApiResponse<Author[]>>(`${this.authorsEndpoint}/all`);
    }
  
    createAuthor(name: string): Observable<ApiResponse<Author>> {
      return this.http.post<ApiResponse<Author>>(`${this.authorsEndpoint}/add`, { name });
    }
  
    getAuthorById(id: string): Observable<ApiResponse<Author>> {
      return this.http.get<ApiResponse<Author>>(`${this.authorsEndpoint}/${id}`);
    }
}
