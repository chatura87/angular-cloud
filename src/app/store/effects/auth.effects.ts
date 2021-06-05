import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {
  AuthActionTypes,
  LogIn,
  LogInFailure,
  LogInSuccess,
  LogOutEvent, LogOutFailure, LogOutSuccess, ResetEvent,
  SignUp,
  SignUpFailure,
  SignUpSuccess
} from '../actions/auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {LoginData} from '../../models/LoginData';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  logIn$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: LogIn) => action.payload),
    switchMap(payload => {
      return this.authService.logIn(payload.username, payload.password).pipe(
        map((loginData: LoginData) => {
          return new LogInSuccess(loginData);
        }),
        catchError(err => {
          return of(new LogInFailure({err}));
        }));
    })));

  signUp$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.SIGN_UP),
    map((action: SignUp) => action.payload),
    switchMap(payload => {
      return this.authService.signUp(payload).pipe(
        map((user) => {
          return new SignUpSuccess(user);
        }),
        catchError(err => {
          return of(new SignUpFailure({err}));
        }));
    })));

  logInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((loginData: LogInSuccess) => {
      if (loginData.payload.authString) {
        localStorage.setItem('token', loginData.payload.authString);
        localStorage.setItem('currentUser', JSON.stringify(loginData.payload.user));
      }
      this.router.navigateByUrl('/home');
    })
  ), {dispatch: false});

  logOut$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOG_OUT),
    map((action: LogOutEvent) => action.payload),
    switchMap(payload => {
      return this.authService.logOut(payload.username, payload.authString).pipe(
        map((loginData: LoginData) => {
          return new LogOutSuccess(loginData);
        }),
        catchError(err => {
          return of(new LogOutFailure({err}));
        }));
    })));

  logOutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActionTypes.LOG_OUT_SUCCESS),
    tap((loginData: LogOutSuccess) => {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/login');
    })
  ), {dispatch: false});

}
