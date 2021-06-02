import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';

@Injectable({providedIn: 'root'})
export class HttpProvider {

  loginUserId: number;

  /**
   * Get the custom HTTP headers to the HTTP requests
   */
  getHeaderForRequest(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
  }
}
