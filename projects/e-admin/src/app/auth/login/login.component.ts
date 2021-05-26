import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../_services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private formSubmitAttempt: boolean;
  error = '';
  isLoading = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) ||
      (this.loginForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    this.loading = true;
    if (this.loginForm.valid) {
      this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe({
          next: () => {
            // get return url from query parameters or default to home page
            const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
            this.router.navigateByUrl(returnUrl);

          },
          error: error => {
            this.error = error;
            this.loading = false;
          }
        });
    }
    this.formSubmitAttempt = true;
  }
  prueba(email: string, password: string) {
    this.authenticationService.login(email, password)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          this.router.navigateByUrl('e-admin/');
        },
        error: error => {
          this.error = error;
          this.loading = false;
        }
      });
  }
}
