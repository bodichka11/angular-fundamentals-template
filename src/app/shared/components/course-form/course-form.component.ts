import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormGroup,
  Validators
} from '@angular/forms';
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
 
  constructor(
    private fb: FormBuilder,
    private library: FaIconLibrary,
  ) {
    this.library.addIconPacks(fas);
    this.initializeForm();
  }
 
  private initializeForm() {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      creationDate: new Date(),
      duration: ["", [Validators.required, Validators.min(0)]],
      authors: this.fb.array([]),
      newAuthor: [
        "",
        [Validators.pattern("[A-Za-z0-9 ]*"), Validators.minLength(2)],
      ],
    });
  }
 
  get authors(): FormArray {
    return this.courseForm.get("authors") as FormArray;
  }
 
  addAuthor() {
    const newAuthorControl = this.courseForm.get("newAuthor");
    const newAuthorValue = newAuthorControl?.value;
 
    if (
      newAuthorValue &&
      typeof newAuthorValue === "string" &&
      newAuthorValue.trim()
    ) {
      const authorControl = this.fb.control(newAuthorValue.trim(), [
        Validators.required,
      ]);
      this.authors.push(authorControl);
      newAuthorControl.reset();
    }
  }
 
  deleteAuthor(index: number) {
    this.authors.removeAt(index);
  }
 
  onSubmit() {
    this.submitted = true;
    if (this.courseForm.valid) {
      console.log("Form Submitted!", this.courseForm.value);
    } else {
      alert("Please fill in all the required fields!");
    }
  }
 
  onCancel() {
    this.courseForm.reset();
    this.submitted = false;
  }
}
