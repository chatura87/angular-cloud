import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectOrganizationState, selectUserState} from '../../app.states';
import {TranslateService} from '@ngx-translate/core';
import {RecStatus} from '../../enums/rec-status';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {ErrorStatusCode} from '../../enums/error-status-code';
import {UserAction} from '../../store/actions/user.actions';
import {User} from '../../models/user';
import {UserType} from '../../enums/user-type';
import {Language} from '../../enums/language';
import {OrganizationAction} from '../../store/actions/organization.action';
import {RecStatusUser} from '../../enums/rec-status-user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<User>;
  displayColumns = ['username', 'name', 'type', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<User>(true, []);
  getUserState: Observable<any>;
  getOrganizationState: Observable<any>;
  destroySub = new Subject<void>();
  errorMsg = null;
  successMsg = null;

  constructor(private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef,
              private translate: TranslateService) {
    this.getUserState = this.store.select(selectUserState);
    this.getOrganizationState = this.store.select(selectOrganizationState);
  }

  userTypes = UserType;
  recStatus = RecStatusUser;
  languages = Language;

  userForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    mobilePhone: new FormControl('', Validators.required),
    userType: new FormControl('', Validators.required),
    language: new FormControl('', Validators.required),
    organization: new FormControl(1, Validators.required),
    recaptchaReactive: new FormControl(null, Validators.required),
    recStatus: new FormControl({value: this.recStatus.ACTIVE, disabled: true}, Validators.required)
  });


  ngOnInit(): void {
    this.store.dispatch({type: UserAction.LOAD});
    this.store.dispatch({type: OrganizationAction.LOAD});
    this.getUserState
      .pipe(takeUntil(this.destroySub))
      .subscribe(state => {
        switch (state.errorCode) {
          case ErrorStatusCode.DUPLICATE_CODE: {
            this.errorMsg = this.translate.instant('organization.code-exists');
            this.userForm.controls.username.setErrors({incorrect: true});
            this.changeDetectorRef.detectChanges();
            return;
          }
          case ErrorStatusCode.NO_ERRORS: {
            this.successMsg = this.translate.instant('recod-save-success');
            this.resetModule();
            this.setDataSource(state.users);
            this.changeDetectorRef.detectChanges();
            return;
          }
        }
      });
  }

  resetModule(): void {
    this.userForm.reset();
    this.userForm.controls.recStatus.disable();
    this.changeDetectorRef.detectChanges();
    this.errorMsg = null;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  setDataSource(users: User[]): any {
    this.userForm.controls.recStatus.setValue(RecStatus.ACTIVE);
    this.dataSource = new MatTableDataSource<User>(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  populateFields(row: User): void {
    this.userForm.controls.recStatus.enable();
    this.userForm.patchValue(row);
    this.userForm.controls.userType.setValue(this.userTypes[row.type]);
    this.userForm.controls.recStatus.setValue(this.recStatus[row.recStatus]);
  }

  getEnumKeyByEnumValue(myEnum, enumValue): any {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  onSubmit(): void {
    this.successMsg = null;
    if (!this.userForm.invalid) {
      const payload = this.userForm.getRawValue();
      if (payload.id > 0) {
        this.store.dispatch({type: UserAction.UPDATE, payload});
      } else {
        this.store.dispatch({type: UserAction.SAVE, payload});
      }
    }
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
    this.store.dispatch({type: UserAction.RESET});
  }
}
