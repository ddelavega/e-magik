import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import pkg from './../../../../../../package.json';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass'],
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  vers = pkg.version;
  ngVersion = VERSION;
  hide = true;
  error = '';
  texting: boolean;
  loading = false;


  constructor(public authService: AuthService, public router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    // this.loginForm.get(field).onKeyup() ? this.texting = true : this.texting = false;
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  isEmailInvalid(field: string) {
    return (
      this.loginForm.get(field).errors
    );
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.resetPass(this.f.email.value);
      this.loading = false;
    }

    this.formSubmitAttempt = true;
  }
  resetPass(value) {
    this.authService.ForgotPassword(value);
  }
}
