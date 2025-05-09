import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  @ViewChild('loginForm') public loginForm!: NgForm;

  model = {
    email: '',
    password: '',
  };

  onSubmit(ngForm: NgForm): void {
    ngForm.form.markAllAsTouched();
    console.log(this.model);
  }
}
