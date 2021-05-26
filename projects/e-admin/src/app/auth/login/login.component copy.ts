// import { Component, OnInit, VERSION } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import pkg from './../../../../../../package.json';
// import { first } from 'rxjs/operators';
// import { AuthenticationService } from '../../_services';


// @Component({
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.sass']
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   error = '';
//   ngVersion = VERSION;
//   isLoading = false;
//   hide = true;
//   vers = pkg.version;

//   constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) {
//     // redirect to home if already logged in
//     if (this.authenticationService.userValue) {
//       this.router.navigate(['/']);
//     }
//   }

//   ngOnInit() {
//     this.loginForm = this.formBuilder.group({
//       email: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   prueba(email: string, password: string) {
//     this.authenticationService.login(email, password)
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           // get return url from query parameters or default to home page
//           this.router.navigateByUrl('e-admin/');
//         },
//         error: error => {
//           this.error = error;
//           this.loading = false;
//         }
//       });
//   }

//   // convenience getter for easy access to form fields
//   get f() {
//     return this.loginForm.controls;
//   }

//   onSubmit() {
//     this.submitted = true;

//     // stop here if form is invalid
//     if (this.loginForm.invalid) {
//       return;
//     }

//     this.loading = true;
//     this.authenticationService.login(this.f.email.value, this.f.password.value)
//       .pipe(first())
//       .subscribe({
//         next: () => {
//           // get return url from query parameters or default to home page
//           const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
//           this.router.navigateByUrl(returnUrl);
//         },
//         error: error => {
//           this.error = error;
//           this.loading = false;
//         }
//       });
//   }
// }
