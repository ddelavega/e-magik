import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { apiApUsuarios, apiAuthInfo } from '../_config/config';
import { User, UserInfo } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
    this.http.get<User[]>(`${apiApUsuarios}`);
  }

  getAllApUsers(): Observable<User[]> {
    console.log('Se inició en servicio la consulta Usuarios');
    return this.http
      .get<User[]>(apiApUsuarios)
      .pipe(
        map((data) => {
          console.log('Usuarios datos devueltos:', data);
          return data;
        })
      );
  }

  getInfoUser(): Observable<UserInfo> {
    console.log('Se inició en servicio la consulta Info Usuarios');
    return this.http
      .get<UserInfo>(apiAuthInfo)
      .pipe(
        map((data) => {
          console.log('Usuarios datos devueltos:', data);
          return data;
        })
      );
  }
}
