import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/generic-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://redticks.dev/api/users/';

  constructor(private http: HttpClient) {}

  signUp$(user: User): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(this.URL + 'signup', user);
  }

  signIn$(user: User): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(this.URL + 'signin', user);
  }

  currentUser$(): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(this.URL + 'currentuser', {
      headers: {
        Authorization: `Bearer ${this.getLocalStorageToken()}`,
      },
    });
  }

  getLocalStorageToken() {
    return localStorage.getItem('jwt');
  }
  setLocalStorageToken(token: { key: string; value: string }) {
    localStorage.setItem(token.key, token.value);
  }
}
