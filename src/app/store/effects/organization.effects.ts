import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from '@angular/router';

import {Load, LoadFailure, LoadSuccess, OrganizationAction, Save, SaveFaliure, SaveSuccess} from '../actions/organization.action';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';


@Injectable()
export class OrganizationEffects {

  constructor(private actions$: Actions,
              private organizationService: OrganizationService,
              private router: Router) {
  }

  save$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAction.SAVE),
    map((action: Save) => action.payload),
    switchMap(payload => {
      return this.organizationService.save(payload).pipe(
        map((loginData: Organization) => {
          return new SaveSuccess(loginData);
        }),
        catchError(err => {
          return of(new SaveFaliure({err}));
        }));
    })));
  update$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAction.UPDATE),
    map((action: Save) => action.payload),
    switchMap(payload => {
      return this.organizationService.update(payload).pipe(
        map((loginData: Organization) => {
          return new SaveSuccess(loginData);
        }),
        catchError(err => {
          return of(new SaveFaliure({err}));
        }));
    })));
  load$ = createEffect(() => this.actions$.pipe(
    ofType(OrganizationAction.LOAD),
    map((action: Load) => action.payload),
    switchMap(payload => {
      return this.organizationService.fetch().pipe(
        map((loginData: Organization[]) => {
          return new LoadSuccess(loginData);
        }),
        catchError(err => {
          return of(new LoadFailure({err}));
        }));
    })));
}
