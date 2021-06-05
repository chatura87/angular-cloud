import {Action} from '@ngrx/store';
import { User } from 'src/app/models/user';


export enum UserAction {
  SAVE = '[User] Save',
  UPDATE = '[User] Update',
  SAVE_SUCCESS = '[User] Save success',
  SAVE_FAILURE = '[User] Save fail',
  RESET = '[User] reset',
  LOAD = '[User] Load',
  LOAD_SUCCESS = '[User] Load success',
  LOAD_FAILURE = '[User] Load failure'
}

export class Save implements Action {
  readonly type = UserAction.SAVE;

  constructor(public payload: User) {
  }
}

export class Update implements Action {
  readonly type = UserAction.UPDATE;

  constructor(public payload: User) {
  }
}

export class SaveSuccess implements Action {
  readonly type = UserAction.SAVE_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SaveFailure implements Action {
  readonly type = UserAction.SAVE_FAILURE;

  constructor(public payload: any) {
  }
}

export class Reset implements Action {
  readonly type = UserAction.RESET;

  constructor(public payload: any) {
  }
}

export class Load implements Action {
  readonly type = UserAction.LOAD;

  constructor(public payload: any) {
  }
}

export class LoadSuccess implements Action {
  readonly type = UserAction.LOAD_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class LoadFailure implements Action {
  readonly type = UserAction.LOAD_FAILURE;

  constructor(public payload: any) {
  }
}


export type All = Save | Update | SaveFailure | SaveSuccess | Reset | Load | LoadSuccess | LoadFailure;
