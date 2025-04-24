import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/auth/services/auth.service';
import { emailValidator } from '@app/shared/directives/email.directive';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, emailValidator()]],
      password: ['', Validators.required],
    });
  }

  get name(): AbstractControl | null {
    return this.registrationForm.get('name');
  }

  get email(): AbstractControl | null  {
    return this.registrationForm.get('email');
  }

  get password(): AbstractControl | null  {
    return this.registrationForm.get('password');
  }

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
  
    if (this.registrationForm.valid) {
      const user = {
        name: this.registrationForm.value.name,
        email: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
      };
  
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log('User registered successfully:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }
}
