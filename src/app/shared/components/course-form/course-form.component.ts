import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '@app/models/author';
import { Course } from '@app/models/course.models';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { combineLatestWith } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private route: ActivatedRoute,
    private router: Router,
    private coursesStore: CoursesStoreService
  ) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  formType!: 'add' | 'edit';
  authorsData: Author[] = [];

  @Input() id = '';

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formType = this.route.snapshot.data['formType'];

    let initCourse: Course = {
      title: '',
      description: '',
      duration: 0,
      authors: [],
      id: '',
      creationDate: '',
    };

    if (this.formType === 'add') {
      this.coursesStore.authors$.subscribe((authors) => {
        this.authorsData = authors;

        this.buildForm(initCourse);
      });
    } else if (this.formType === 'edit') {
      this.coursesStore.getCourse(this.id);

      this.coursesStore.authors$
        .pipe(combineLatestWith(this.coursesStore.courses$))
        .subscribe(([authors, courses]) => {
          this.authorsData = authors;
          const course = courses[0];

          initCourse = {
            title: course.title,
            description: course.description,
            duration: course.duration,
            authors: this.authorsData
              .filter((authorData) => course.authors.includes(authorData.id))
              .map((authorData) => authorData.id),
            id: course.id,
            creationDate: course.creationDate,
          };

          this.authorsData = this.authorsData.filter(
            (authorData) => !course.authors.includes(authorData.id)
          );

          this.buildForm(initCourse);
        });
    }
  }

  private buildForm(initCourse: Course): void {
    this.courseForm = this.fb.group({
      title: [initCourse.title, [Validators.required, Validators.minLength(2)]],
      description: [
        initCourse.description,
        [Validators.required, Validators.minLength(2)],
      ],
      newAuthor: this.fb.group({
        author: [
          '',
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]*$/)],
        ],
      }),
      courseAuthors: this.fb.array<FormControl<Author | null>>(
        initCourse.authors
          .map((authorId) => this.authorsData.find((author) => author.id === authorId))
          .filter((author): author is Author => author !== undefined)
          .map((author) => this.fb.control(author)),
        Validators.required
      ),
      duration: [initCourse.duration, [Validators.required, Validators.min(0)]],
    });
  }

  get title(): AbstractControl | null {
    return this.courseForm.get('title');
  }

  get description(): AbstractControl | null {
    return this.courseForm.get('description');
  }

  get author(): AbstractControl | null {
    return this.courseForm.get('newAuthor.author');
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get duration(): AbstractControl | null {
    return this.courseForm.get('duration');
  }

  createAuthor(name: string): void {
    if (this.author?.valid) {
      this.coursesStore.createAuthor(name);
      this.courseForm.get('newAuthor')?.reset();
    }
  }

  deleteAuthor(author: Author): void {
    this.authorsData = this.authorsData.filter(({ id }) => author.id !== id);
  }

  addCourseAuthor(author: Author): void {
    this.courseAuthors.push(this.fb.control(author));
    this.authorsData = this.authorsData.filter(({ id }) => author.id !== id);
  }

  removeCourseAuthor(index: number): void {
    const author = this.courseAuthors.at(index).value;
    this.authorsData.push(author);
    this.courseAuthors.removeAt(index);
  }

  onSubmit(): void {
    this.courseForm.markAllAsTouched();

    const courseData: Course = {
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      duration: this.courseForm.value.duration,
      authors: this.courseForm.value.courseAuthors.map(
        (author: Author) => author.id
      ),
    };

    if (this.formType === 'add') {
      this.coursesStore.createCourse(courseData);
    } else if (this.formType === 'edit') {
      this.coursesStore.editCourse(this.id, courseData);
    }

    this.router.navigate(['/courses']);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
