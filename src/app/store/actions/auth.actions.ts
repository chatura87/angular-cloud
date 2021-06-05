import {Action} from '@ngrx/store';
import { LoginData } from 'src/app/models/LoginData';
import { User } from 'src/app/models/user';


export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login success',
  LOGIN_FAILURE = '[Auth] Login fail',
  SIGN_UP = '[Auth] Sign up',
  SIGN_UP_SUCCESS = '[Auth] Sign up success',
  SIGN_UP_FAILURE = '[Auth] Sign up fail',
  RESET_EVENT = '[Auth] Reset',
  LOG_OUT = '[Auth] Log out',
  LOG_OUT_SUCCESS = '[Auth] Log out success',
  LOG_OUT_FAILURE = '[Auth] Log out fail',
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: LoginData) {
  }
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: LoginData) {
  }
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: any) {
  }
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGN_UP;

  constructor(public payload: User) {
  }
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGN_UP_SUCCESS;

  constructor(public payload: any) {
  }
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGN_UP_FAILURE;

  constructor(public payload: any) {
  }
}

export class ResetEvent implements Action {
  readonly type = AuthActionTypes.RESET_EVENT;

  constructor(public payload: any) {
  }
}

export class LogOutEvent implements Action {
  readonly type = AuthActionTypes.LOG_OUT;

  constructor(public payload: LoginData) {
  }
}

export class LogOutSuccess implements Action {
  readonly type = AuthActionTypes.LOG_OUT_SUCCESS;

  constructor(public payload: LoginData) {
  }
}

export class LogOutFailure implements Action {
  readonly type = AuthActionTypes.LOG_OUT_FAILURE;

  constructor(public payload: any) {
  }
}


export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOutEvent
  | LogOutSuccess
  | LogOutFailure
  | ResetEvent;
