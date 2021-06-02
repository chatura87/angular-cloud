import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserService} from '../../services/User.service';
import {Load, LoadFailure, LoadSuccess, Save, SaveFailure, SaveSuccess, UserAction} from '../actions/user.actions';
import {User} from '../../models/User';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions,
              private userService: UserService) {
  }

  save$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.SAVE),
    map((action: Save) => action.payload),
    switchMap(payload => {
      return this.userService.save(payload).pipe(
        map((loginData: User) => {
          return new SaveSuccess(loginData);
        }),
        catchError(err => {
          return of(new SaveFailure({err}));
        }));
    })));
  update$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.UPDATE),
    map((action: Save) => action.payload),
    switchMap(payload => {
      return this.userService.update(payload).pipe(
        map((user: User) => {
          return new SaveSuccess(user);
        }),
        catchError(err => {
          return of(new SaveFailure({err}));
        }));
    })));
  load$ = createEffect(() => this.actions$.pipe(
    ofType(UserAction.LOAD),
    map((action: Load) => action.payload),
    switchMap(payload => {
      return this.userService.fetch().pipe(
        map((users: User[]) => {
          return new LoadSuccess(users);
        }),
        catchError(err => {
          return of(new LoadFailure({err}));
        }));
    })));
}
