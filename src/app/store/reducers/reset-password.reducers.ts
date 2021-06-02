import {AllResetActions, ResetPasswordActionTypes} from '../actions/reset-password.actions';

export interface State {
  // is a reset link sent
  isLinkSent: boolean;
  // password change status
  isPasswordChanged: boolean;
  // error code
  errorCode: number;
}

export const initialState: State = {
  isLinkSent: false,
  errorCode: null,
  isPasswordChanged: false
};

export function reducer(state = initialState, action: AllResetActions): State {
  switch (action.type) {
    case ResetPasswordActionTypes.SEND_LINK_SUCCESS: {
      return {
        ...state,
        isLinkSent: true
      };
    }
    case ResetPasswordActionTypes.RESET_PWD_SUCCESS: {
      return {
        ...state,
        isPasswordChanged: true
      };
    }
    case ResetPasswordActionTypes.SEND_LINK_FAILURE: {
      return {
        ...state,
        errorCode: 0
      };
    }
    case ResetPasswordActionTypes.RESET_PWD_FAILURE: {
      return {
        ...state,
        errorCode: 0
      };
    }
    case ResetPasswordActionTypes.RESET_EVENT: {
      return Object.assign({}, initialState);
    }
    default:
      return state;
  }
}
