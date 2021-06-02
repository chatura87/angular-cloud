import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {LoginData} from '../models/LoginData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(username: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<LoginData>(url, {username, password});
  }

  logOut(username: string, token: string): Observable<any> {
    const url = `${this.BASE_URL}/logout`;
    return this.http.post<LoginData>(url, {username, authString: token});
  }

  signUp(user: User): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, user);
  }

  sendResetPasswordLink(email: string): Observable<string> {
    const url = `${this.BASE_URL}/send-reset-link`;
    return this.http.post<string>(url, {email});
  }

  resetPassword(password: string, id: number): Observable<string> {
    const url = `${this.BASE_URL}/reset-password`;
    return this.http.post<string>(url, {password, id});
  }

  getLoggedInUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }
}
