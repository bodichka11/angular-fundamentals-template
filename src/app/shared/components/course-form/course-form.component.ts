import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { Author } from '@app/models/author';
import { mockedAuthorsList } from '@app/shared/mocks/mocks';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  courseForm!: FormGroup;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      author: [
        '',
        [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]*$/)]
      ],
      authors: this.fb.array<Author>(mockedAuthorsList),
      courseAuthors: this.fb.array<Author>([], Validators.required),
      duration: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get author() {
    return this.courseForm.get('author');
  }

  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get duration() {
    return this.courseForm.get('duration');
  }

  createAuthor(name: string) {
    if (this.author?.valid) {
      this.authors.push(this.fb.control({ name, id: 'generateRandomId' }));
      this.author?.reset();
    }
  }

  deleteAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  addCourseAuthor(author: Author, index: number): void {
    this.courseAuthors.push(this.fb.control(author));
    this.authors.removeAt(index);
  }

  removeCourseAuthor(index: number): void {
    const author = this.courseAuthors.at(index).value;
    this.authors.push(this.fb.control(author));
    this.courseAuthors.removeAt(index);
  }

  onSubmit(): void {
    this.courseForm.markAllAsTouched();
    console.log('submit');
  }

  onCancel(): void {
    console.log('cancel');
  }
}
