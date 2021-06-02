import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HttpProvider} from '../../services/HttpProvider';
import {ActivatedRoute} from '@angular/router';
import {map, takeUntil, tap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {AppState, selectResetState} from '../../app.states';
import {Store} from '@ngrx/store';
import {ResetPasswordActionTypes} from '../../store/actions/reset-password.actions';
import {TranslateService} from '@ngx-translate/core';
import {ErrorStatusCode} from '../../enums/error-status-code';

@Component({
  selector: 'app-home',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  userId = 0;
  destroySub = new Subject<void>();
  getState: Observable<any>;
  errorMessage: string;

  constructor(private http: HttpClient,
              private httpProvider: HttpProvider,
              private route: ActivatedRoute,
              private store: Store<AppState>,
              private translate: TranslateService) {
    this.getState = this.store.select(selectResetState);
  }

  registerFrom = new FormGroup({
    username: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    reTypePassword: new FormControl(null, Validators.required),
  });


  ngOnInit(): void {
    // internal subscriptions
    this.route.params.pipe(map(param => param.id), tap(value => this.userId = value ? value : 0), takeUntil(this.destroySub)).subscribe();
    this.registerFrom.valueChanges
      .pipe(takeUntil(this.destroySub))
      .subscribe(value => {
        if (this.userId === 0) {
          this.registerFrom.controls.password.setValidators(null);
          this.registerFrom.controls.reTypePassword.setValidators(null);

          this.registerFrom.controls.password.updateValueAndValidity();
          this.registerFrom.controls.reTypePassword.updateValueAndValidity();
        } else {
          this.registerFrom.controls.username.setValidators(null);
          this.registerFrom.controls.username.updateValueAndValidity();
        }
      });
    this.getState
      .pipe(takeUntil(this.destroySub))
      .subscribe((state) => {
        this.registerFrom.reset();
        switch (state.errorCode) {
          case ErrorStatusCode.LOGIN_USER_NOT_FOUND:
            this.errorMessage = this.translate.instant('reset-password.email-not-found');
            return;
          case 2:
            this.errorMessage = this.translate.instant('reset-password.password-reset-fail');
            return;
          case ErrorStatusCode.NO_ERRORS:
            return;
        }
      });
  }

  onSubmit(): void {

    const payload = {
      id: this.userId,
      username: this.registerFrom.controls.username.value,
      password: null,
      reTypePassword: null
    };
    if (this.registerFrom.controls.password.value && this.registerFrom.controls.reTypePassword.value) {
      if (this.registerFrom.controls.password.value.toString() === this.registerFrom.controls.reTypePassword.value.toString()) {
        payload.password = this.registerFrom.controls.password.value;
        this.store.dispatch({type: ResetPasswordActionTypes.RESET_PWD, payload});
      } else {
        this.errorMessage = this.translate.instant('reset-password.password-not-match');
      }

    } else {
      this.store.dispatch({type: ResetPasswordActionTypes.SEND_LINK, payload});
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch({type: ResetPasswordActionTypes.RESET_EVENT});
    this.registerFrom.reset();
    this.destroySub.next();
    this.destroySub.complete();
  }
}
