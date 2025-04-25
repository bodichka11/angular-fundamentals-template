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
import { AuthorsFacade } from '@app/store/authors/authors.facade';
import { CoursesStateFacade } from '@app/store/courses/courses.facade';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Subject, takeUntil } from 'rxjs';

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
    public coursesFacade: CoursesStateFacade,
    public authorsFacade: AuthorsFacade,

  ) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;
  formType!: 'add' | 'edit';
  authorsData: Author[] = [];

  @Input() id = '';

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.initializeForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeForm(): void {
    this.formType = this.route.snapshot.data['formType'];

    let initialCourseData: Course = {
      title: '',
      description: '',
      duration: 0,
      authors: [],
      id: '',
      creationDate: '',
    };

    combineLatest([this.coursesFacade.course$, this.authorsFacade.authors$])
    .pipe(takeUntil(this.destroy$))
    .subscribe(([course, authors]) => {
      if (course && this.formType === 'edit') {
        this.authorsData = authors.filter(
          (a) => !course?.authors.includes(a.id)
        );

        const initCourseAuthors = authors.filter((a) =>
          course?.authors.includes(a.id)
        );

        initialCourseData = {
          ...initialCourseData,
          ...course,
          authors: initCourseAuthors.map(author => author.id),
        };
      } else {
        this.authorsData = [...authors];
      }

      this.buildForm(initialCourseData);
    });
  }

  private buildForm(initialCourseData: Course): void {
    this.courseForm = this.fb.group({
      title: [initialCourseData.title, [Validators.required, Validators.minLength(2)]],
      description: [
        initialCourseData.description,
        [Validators.required, Validators.minLength(2)],
      ],
      newAuthor: this.fb.group({
        author: [
          '',
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]*$/)],
        ],
      }),
      courseAuthors: this.fb.array<FormControl<Author | null>>(
        initialCourseData.authors
          .map((authorId) => this.authorsData.find((author) => author.id === authorId))
          .filter((author): author is Author => author !== undefined)
          .map((author) => this.fb.control(author)),
        Validators.required
      ),
      duration: [initialCourseData.duration, [Validators.required, Validators.min(0)]],
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
      this.authorsFacade.createAuthor(name);
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

  removeCourseAuthor(author: Author, index: number): void {
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
      this.coursesFacade.createCourse(courseData);
    } else if (this.formType === 'edit') {
      this.coursesFacade.editCourse(courseData, this.id);
    }

    this.router.navigate(['/courses']);
  }

  onCancel(): void {
    this.router.navigate(['/courses']);
  }
}
