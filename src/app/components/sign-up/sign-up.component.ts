import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserType} from '../../enums/user-type';
import {Language} from '../../enums/language';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../app.states';
import {AuthActionTypes} from '../../store/actions/auth.actions';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {ErrorStatusCode} from '../../enums/error-status-code';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>,
              private translate: TranslateService) {
    this.getState = this.store.select(selectAuthState);
  }

  registerFrom = new FormGroup({
    fullName: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    contact: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    organization: new FormControl(1, Validators.required),
    recaptchaReactive: new FormControl(null, Validators.required)
  });

  roles = UserType;
  languages = Language;
  update = false;
  getState: Observable<any>;
  destroySub = new Subject<void>();
  errorMessage = null;
  successMessage = null;

  ngOnInit(): void {
    this.getState.pipe(takeUntil(this.destroySub))
      .subscribe(state => {
        switch (state.errorCode) {
          case ErrorStatusCode.USER_ALREADY_EXISTS:
            this.errorMessage = this.translate.instant('sign-up.username-already-exists');
            this.registerFrom.controls.username.setErrors({incorrect: true});
            return;
          case ErrorStatusCode.NO_ERRORS:
            this.successMessage = this.translate.instant('sign-up.success-user-creation-message');
            this.registerFrom.reset();
            this.registerFrom.markAsPristine();
            this.registerFrom.markAsUntouched();
            this.registerFrom.updateValueAndValidity();
            this.registerFrom.clearValidators();
            this.registerFrom.updateValueAndValidity();
            return;
        }
      });
  }

  onSubmit(): void {
    this.clearMessages();
    const payload = this.registerFrom.value;
    this.store.dispatch({type: AuthActionTypes.SIGN_UP, payload});
  }

  private clearMessages(): void {
    this.errorMessage = null;
    this.successMessage = null;
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
    this.store.dispatch({type: AuthActionTypes.RESET_EVENT});
  }
}
