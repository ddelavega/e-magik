// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// // import { environment } from '../../environments/environment';
// // import { User } from '../_models';
// import { apiAuth } from '../_config/config';

// @Injectable({ providedIn: 'root' })
// export class AuthenticationService {
//   private currentUserSubject: BehaviorSubject<any>;
//   public currentUser: Observable<any>;
//   constructor(private router: Router, private http: HttpClient) {
//     this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
//     this.currentUser = this.currentUserSubject.asObservable();
//   }

//   public get userValue(): any {
//     return this.currentUserSubject.value;
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http
//       .post<any>(`${apiAuth}`, { email, password })
//       .pipe(
//         map(user => {
//           // store user details and jwt token in local storage to keep user logged in between page refreshes
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           console.log('User', user);
//           this.currentUserSubject.next(user);
//           return user;
//         })
//       );
//   }

//   logout(): void {
//     // remove user from local storage to log user out
//     localStorage.removeItem('currentUser');
//     this.currentUserSubject.next(null);
//     this.currentUser = null;
//     console.log('User', this.currentUser);
//     this.router.navigate(['/login']);public router: Router
//   }
// }
