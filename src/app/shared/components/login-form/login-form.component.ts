import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;
  
  onSubmit(): void {
    this.loginForm.form.markAllAsTouched();

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Logging in with', email, password);
    }
  }
}
