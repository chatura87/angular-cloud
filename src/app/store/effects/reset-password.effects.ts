import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {
  ResetPasswordActionTypes,
  ResetPasswordFailure,
  ResetPasswordSuccess,
  SendLink,
  SendLinkFail,
  SendLinkSuccess
} from '../actions/reset-password.actions';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class ResetPasswordEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }

  sendResetLink$ = createEffect(() => this.actions$.pipe(
    ofType(ResetPasswordActionTypes.SEND_LINK),
    map((action: SendLink) => action.payload),
    switchMap(payload => {
      return this.authService.sendResetPasswordLink(payload.username).pipe(
        map((response) => {
          return new SendLinkSuccess(response);
        }),
        catchError(err => {
          return of(new SendLinkFail({err}));
        }));
    })));
  resetPassword$ = createEffect(() => this.actions$.pipe(
    ofType(ResetPasswordActionTypes.RESET_PWD),
    map((action: SendLink) => action.payload),
    switchMap(payload => {
      return this.authService.resetPassword(payload.password, payload.id).pipe(
        map((response) => {
          console.log(response);
          return new ResetPasswordSuccess(response);
        }),
        catchError(err => {
          return of(new ResetPasswordFailure({err}));
        }));
    })));
}
