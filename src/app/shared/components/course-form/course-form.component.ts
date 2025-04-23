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
  submitted = false;

  availableAuthors: Author[] = [...mockedAuthorsList];

  constructor(
    private fb: FormBuilder,
    library: FaIconLibrary
  ) {
    library.addIconPacks(fas);
  }

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: this.fb.group({
        author: [
          '',
          [
            Validators.minLength(2),
            Validators.pattern(/^[A-Za-z0-9]+$/)
          ]
        ]
      })
    });
  }

  get f() {
    return this.courseForm.controls;
  }

  get authors(): FormArray<FormGroup> {
    return this.f['authors'] as FormArray<FormGroup>;
  }

  get newAuthorControl(): FormControl {
    return (this.f['newAuthor'] as FormGroup).get('author') as FormControl;
  }

  addAuthor(a: Author) {
    this.availableAuthors = this.availableAuthors.filter(x => x.id !== a.id);
    this.authors.push(this.fb.group({
      id: [a.id],
      name: [{ value: a.name, disabled: true }]
    }));
  }

  deleteAuthor(i: number) {
    const grp = this.authors.at(i) as FormGroup;
    const author: Author = {
      id: grp.get('id')!.value,
      name: grp.get('name')!.value
    };
    this.availableAuthors.push(author);
    this.authors.removeAt(i);
  }

  createAuthor() {
    this.newAuthorControl.markAsTouched();
    if (this.newAuthorControl.invalid) return;
    const name = this.newAuthorControl.value;
    const newAuth: Author = {
      id: Math.random().toString(36).substr(2, 9),
      name
    };
    this.availableAuthors.push(newAuth);
    this.newAuthorControl.reset();
  }

  onSubmit() {
    this.submitted = true;
    this.courseForm.markAllAsTouched();
    if (this.courseForm.invalid) return;
    const payload = {
      ...this.courseForm.value,
      authors: this.authors.controls.map(g => (g as FormGroup).get('id')!.value)
    };
    console.log('Save course:', payload);
  }
}
