import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AppState, selectAuthState} from '../../app.states';
import {Store} from '@ngrx/store';
import {AuthActionTypes} from '../../store/actions/auth.actions';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ErrorStatusCode} from '../../enums/error-status-code';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  destroySub = new Subject<void>();
  getState: Observable<any>;
  errorMessage: null;

  constructor(private store: Store<AppState>,
              readonly translate: TranslateService,
              private router: Router) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
  }

  ngOnInit(): void {
    this.getState.pipe(takeUntil(this.destroySub)).subscribe(value => {
      if (value.errorCode === ErrorStatusCode.LOGIN_USER_NOT_FOUND) {
        this.errorMessage = this.translate.instant('login.user-pwd-incorrect');
      }
    });
  }

  logIn(loginForm: NgForm): void {
    this.errorMessage = null;
    const payload = {
      username: loginForm.value.email,
      password: loginForm.value.password
    };
    if (payload.username && payload.password) {
      this.store.dispatch({type: AuthActionTypes.LOGIN, payload});
    }
  }

  signUp(): void {
    this.router.navigate(['/sign-up']);
  }

  resetPassword(): void {
    this.router.navigate(['/reset-password']);
  }
}
