import {Action} from '@ngrx/store';
import {Organization} from '../../models/organization';

export enum OrganizationAction {
  SAVE = '[Organization] Save',
  UPDATE = '[Organization] Update',
  SAVE_SUCCESS = '[Organization] Save success',
  SAVE_FAILURE = '[Organization] Save fail',
  RESET = '[Organization] reset',
  LOAD = '[Organization] Load',
  LOAD_SUCCESS = '[Organization] Load success',
  LOAD_FAILURE = '[Organization] Load failure'
}

export class Save implements Action {
  readonly type = OrganizationAction.SAVE;

  constructor(public payload: Organization) {
  }
}

export class Update implements Action {
  readonly type = OrganizationAction.UPDATE;

  constructor(public payload: Organization) {
  }
}

export class SaveSuccess implements Action {
  readonly type = OrganizationAction.SAVE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SaveFaliure implements Action {
  readonly type = OrganizationAction.SAVE_FAILURE;

  constructor(public payload: any) {
  }
}

export class Reset implements Action {
  readonly type = OrganizationAction.RESET;

  constructor(public payload: any) {
  }
}

export class Load implements Action {
  readonly type = OrganizationAction.LOAD;

  constructor(public payload: any) {
  }
}

export class LoadSuccess implements Action {
  readonly type = OrganizationAction.LOAD_SUCCESS;

  constructor(public payload: Organization[]) {
  }
}

export class LoadFailure implements Action {
  readonly type = OrganizationAction.LOAD_FAILURE;

  constructor(public payload: any) {
  }
}


export type All = Save | Update | SaveFaliure | SaveSuccess | Reset | Load | LoadSuccess | LoadFailure;
