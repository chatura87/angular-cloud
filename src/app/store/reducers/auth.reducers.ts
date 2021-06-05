
import { User } from 'src/app/models/user';
import {All, AuthActionTypes} from '../actions/auth.actions';

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // custom error code
  errorCode: number;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorCode: -1
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorCode: 0
      };
    }
    case AuthActionTypes.SIGN_UP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        errorCode: 0
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case AuthActionTypes.SIGN_UP_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case AuthActionTypes.LOG_OUT_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case AuthActionTypes.RESET_EVENT: {
      return Object.assign({}, initialState);
    }
    default:
      return state;
  }
}
