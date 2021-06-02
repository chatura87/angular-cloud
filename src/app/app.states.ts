import * as auth from './store/reducers/auth.reducers';
import * as resetReducer from './store/reducers/reset-password.reducers';
import * as organizationReducer from './store/reducers/organization.reducer';
import * as userReducer from './store/reducers/user.reducers';
import {createFeatureSelector} from '@ngrx/store';


export interface AppState {
  authState: auth.State;
  resetState: resetReducer.State;
  organizationState: organizationReducer.State;
  userState: userReducer.State;
}

export const reducers = {
  auth: auth.reducer,
  reset: resetReducer.reducer,
  organization: organizationReducer.reducer,
  user: userReducer.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectResetState = createFeatureSelector<AppState>('reset');
export const selectOrganizationState = createFeatureSelector<AppState>('organization');
export const selectUserState = createFeatureSelector<AppState>('user');
