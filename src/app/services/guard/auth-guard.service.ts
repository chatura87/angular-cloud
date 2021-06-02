import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if ((localStorage.getItem('token')
      && localStorage.getItem('token') !== '')
      && (localStorage.getItem('currentUser')
        && localStorage.getItem('currentUser') !== '')) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }

}
