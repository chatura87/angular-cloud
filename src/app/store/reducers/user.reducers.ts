import { User } from 'src/app/models/user';
import {All, UserAction} from '../actions/user.actions';


export interface State {
  // is data loaded?
  loaded: boolean;
  // if loaded, there should be a list of user objects
  users: User[] | null;
  // custom error code
  errorCode: number;
}

export const initialState: State = {
  loaded: false,
  users: null,
  errorCode: -1
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case UserAction.SAVE_SUCCESS: {
      return {
        ...state,
        loaded: true,
        users: action.payload,
        errorCode: 0
      };
    }
    case UserAction.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        users: action.payload,
        errorCode: 0
      };
    }
    case UserAction.SAVE_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case UserAction.LOAD_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case UserAction.RESET: {
      return Object.assign({}, initialState);
    }
    default: {
      return state;
    }
  }
}
