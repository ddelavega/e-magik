import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize } from 'rxjs/operators';

import { RoleBo, User } from '../_models';

const users: User[] = [
  {
    role: 'Admin',
    email: 'rgalvan@accionpoint.com',
    password: '013600',
    phone: '12334123',
    cuit: '20263383436',
    razonSocial: 'Rama j',
    psp: '12',
    verified: '2020-09-17T18:57:09.512Z',
    bo: true,
    boRole: RoleBo.Client,
    isVerified: true,
    id: '5f63b185c1aca500122bb9ae',
    jwtToken: 'fake-jwt-token'
  },
  {
    role: 'Admin',
    email: 'ddelavega@accionpoint.com',
    password: '123456',
    phone: '1540310948',
    cuit: '20277394565',
    razonSocial: 'Sitemanager Admin',
    psp: '10',
    verified: '2020-09-23T14:14:25.722Z',
    bo: true,
    boRole: RoleBo.Admin,
    isVerified: true,
    id: '5f6b5841b21dfa0012d27ab3',
    jwtToken: 'fake-jwt-token'
  },
  {
    role: 'Admin',
    email: 'dev@dev.com',
    password: '013600',
    phone: '1540310948',
    cuit: '20277394565',
    razonSocial: 'Sitemanager Client',
    psp: '10',
    verified: '2020-09-23T14:14:25.722Z',
    bo: true,
    boRole: RoleBo.Admin,
    isVerified: true,
    id: '5f6b5841b21dfa0012d27ab3',
    jwtToken: 'fake-jwt-token'
  },
  {
    role: 'Admin',
    email: 'user@accionpoint.com',
    password: '013600',
    phone: '1540310948',
    cuit: '20277394565',
    razonSocial: 'Sitemanager Admin',
    psp: '10',
    verified: '2020-09-23T14:14:25.722Z',
    bo: true,
    boRole: RoleBo.User,
    isVerified: true,
    id: '5f6b5841b21dfa0012d27ab3',
    jwtToken: 'fake-jwt-token'
  }
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    return handleRoute();

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate(): Observable<HttpResponse<any>> {
      const { username, password } = body;
      const user = users.find(x => x.email === username && x.password === password);
      if (!user) { return error('Username or password is incorrect'); }
      return ok({
        id: user.id,
        email: user.email,
        password: user.password,
        jwtToken: user.jwtToken,
        // role: user.role,
        phone: user.phone,
        cuit: user.cuit,
        razonSocial: user.razonSocial,
        psp: user.psp,
        // created: user.created,
        // verificationToken: user.verificationToken,
        verified: user.verified,
        bo: user.bo,
        boRole: user.boRole,
        // updated: user.updated,
        isVerified: user.isVerified,
        token: `fake-jwt-token.${user.id}`
      });
    }

    function getUsers(): Observable<HttpResponse<any>> {
      if (!isAdmin() && !isClient()) { return unauthorized(); }
      return ok(users);
    }

    function getUserById(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) { return unauthorized(); }

      // only admins can access other user records
      if ((!isAdmin() || !isClient()) && currentUser().id !== idFromUrl()) { return unauthorized(); }

      const user = users.find(x => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    function ok(bodyx): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body: bodyx })).pipe(delay(500));
      // delay observable to simulate server api call
    }

    function unauthorized(): Observable<never> {
      return throwError({ status: 401, error: { message: 'unauthorized' } }).pipe(materialize(), delay(500), dematerialize());
      // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function error(message): Observable<never> {
      return throwError({ status: 400, error: { message } }).pipe(materialize(), delay(500), dematerialize());
    }

    function isLoggedIn(): boolean {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin(): boolean {
      return isLoggedIn() && currentUser().boRole === RoleBo.Admin;
    }

    function isClient(): boolean {
      return isLoggedIn() && currentUser().boRole === RoleBo.Client;
    }

    function currentUser(): User {
      if (!isLoggedIn()) { return; }
      const id = headers.get('Authorization').split('.')[1];
      return users.find(x => x.id === id);
    }

    function idFromUrl(): string {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
