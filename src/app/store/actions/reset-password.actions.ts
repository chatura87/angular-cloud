import {Action} from '@ngrx/store';

export enum ResetPasswordActionTypes {
  SEND_LINK = '[Reset] Send reset link',
  RESET_PWD = '[Reset] Reset password',
  SEND_LINK_SUCCESS = '[Reset] Send reset link success',
  SEND_LINK_FAILURE = '[Reset] Send reset link failed',
  RESET_PWD_SUCCESS = '[Reset] Reset password success',
  RESET_PWD_FAILURE = '[Reset] Reset password failed',
  RESET_EVENT = '[Reset] Reset'

}

export class SendLink implements Action {
  readonly type = ResetPasswordActionTypes.SEND_LINK;

  constructor(public payload: any) {
  }
}

export class ResetPassword implements Action {
  readonly type = ResetPasswordActionTypes.RESET_PWD;

  constructor(public payload: any) {
  }
}

export class ResetPasswordSuccess implements Action {
  readonly type = ResetPasswordActionTypes.RESET_PWD_SUCCESS;

  constructor(public payload: string) {
  }
}

export class ResetPasswordFailure implements Action {
  readonly type = ResetPasswordActionTypes.RESET_PWD_FAILURE;

  constructor(public payload: any) {
  }
}

export class SendLinkSuccess implements Action {
  readonly type = ResetPasswordActionTypes.SEND_LINK_SUCCESS;

  constructor(public payload: string) {
  }
}

export class SendLinkFail implements Action {
  readonly type = ResetPasswordActionTypes.SEND_LINK_FAILURE;

  constructor(public payload: any) {
  }
}

export class ResetEvent implements Action {
  readonly type = ResetPasswordActionTypes.RESET_EVENT;

  constructor(public payload: any) {
  }
}

export type AllResetActions =
  | SendLink
  | ResetPassword
  | SendLinkSuccess
  | SendLinkFail
  | ResetPasswordSuccess
  | ResetPasswordFailure
  | ResetEvent;
