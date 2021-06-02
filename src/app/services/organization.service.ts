import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LoginData} from '../models/LoginData';
import {Organization} from '../models/organization';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private BASE_URL = `${environment.apiUrl}/organization`;

  constructor(private http: HttpClient) {
  }

  save(organization: Organization): Observable<any> {
    const url = `${this.BASE_URL}/save`;
    return this.http.post<LoginData>(url, organization);
  }

  update(organization: Organization): Observable<any> {
    const url = `${this.BASE_URL}/${organization.id}`;
    return this.http.put<LoginData>(url, organization);
  }

  fetch(): Observable<any> {
    const url = `${this.BASE_URL}/fetch`;
    return this.http.get<LoginData>(url);
  }
}
