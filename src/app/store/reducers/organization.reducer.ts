
import { Organization } from 'src/app/models/organization';
import {All, OrganizationAction} from '../actions/organization.action';

export interface State {
  // is data loaded?
  loaded: boolean;
  // if loaded, there should be a list of organization objects
  organizations: Organization[] | null;
  // custom error code
  errorCode: number;
}

export const initialState: State = {
  loaded: false,
  organizations: null,
  errorCode: -1
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case OrganizationAction.SAVE_SUCCESS: {
      return {
        ...state,
        loaded: true,
        organizations: action.payload,
        errorCode: 0
      };
    }
    case OrganizationAction.LOAD_SUCCESS: {
      return {
        ...state,
        loaded: true,
        organizations: action.payload,
        errorCode: 0
      };
    }
    case OrganizationAction.SAVE_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case OrganizationAction.LOAD_FAILURE: {
      return {
        ...state,
        errorCode: action.payload.err.error.errorStatusCode
      };
    }
    case OrganizationAction.RESET: {
      return Object.assign({}, initialState);
    }
    default: {
      return state;
    }
  }
}
