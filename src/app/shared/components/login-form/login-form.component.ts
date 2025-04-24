import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  constructor(private authService: AuthService, private router: Router) {}
  
  @ViewChild('loginForm') public loginForm!: NgForm;

  model = {
    email: '',
    password: '',
  };

  onSubmit(ngForm: NgForm): void {
    ngForm.form.markAllAsTouched();

    if (ngForm.valid) {
      
      const userCredentials = {
        email: this.model.email,
        password: this.model.password,
      };

      this.authService.login(userCredentials).subscribe({
        next: () => {
          console.log('Login successful');
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    }
  }
}
