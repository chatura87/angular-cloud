import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = `${environment.apiUrl}/user`;

  constructor(private http: HttpClient) {
  }

  save(user: User): Observable<any> {
    const url = `${this.BASE_URL}/save`;
    return this.http.post(url, user);
  }

  update(user: User): Observable<any> {
    const url = `${this.BASE_URL}/${user.id}`;
    return this.http.put(url, user);
  }

  fetch(): Observable<any> {
    const url = `${this.BASE_URL}/fetch`;
    return this.http.get(url);
  }
}
