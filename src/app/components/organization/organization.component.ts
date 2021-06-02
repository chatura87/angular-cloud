import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OrganizationType} from '../../enums/organization-type';
import {Organization} from '../../models/organization';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SelectionModel} from '@angular/cdk/collections';
import {Observable, Subject} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState, selectOrganizationState} from '../../app.states';
import {takeUntil} from 'rxjs/operators';
import {OrganizationAction} from '../../store/actions/organization.action';
import {RecStatus} from '../../enums/rec-status';
import {ErrorStatusCode} from '../../enums/error-status-code';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<Organization>;
  displayColumns = ['code', 'name', 'type', 'status'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Organization>(true, []);
  getState: Observable<any>;
  destroySub = new Subject<void>();
  errorMsg = null;
  successMsg = null;

  constructor(private store: Store<AppState>,
              private changeDetectorRef: ChangeDetectorRef,
              private translate: TranslateService) {
    this.getState = this.store.select(selectOrganizationState);
  }

  organizationTypes = OrganizationType;
  recStatus = RecStatus;
  organizationFrom = new FormGroup({
    id: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    code: new FormControl('', [Validators.required]),
    type: new FormControl('', Validators.required),
    recStatus: new FormControl({value: this.recStatus.ACTIVE, disabled: true}, Validators.required)
  });


  ngOnInit(): void {
    this.store.dispatch({type: OrganizationAction.LOAD});
    this.getState
      .pipe(takeUntil(this.destroySub))
      .subscribe(state => {
        switch (state.errorCode) {
          case ErrorStatusCode.DUPLICATE_CODE: {
            this.errorMsg = this.translate.instant('organization.code-exists');
            this.organizationFrom.controls.code.setErrors({incorrect: true});
            this.changeDetectorRef.detectChanges();
            return;
          }
          case ErrorStatusCode.NO_ERRORS: {
            this.successMsg = this.translate.instant('recod-save-success');
            this.resetModule();
            this.setDataSource(state.organizations);
            this.changeDetectorRef.detectChanges();
            return;
          }
        }


      });
  }

  resetModule(): void {
    this.organizationFrom.reset();
    this.organizationFrom.controls.recStatus.disable();
    this.changeDetectorRef.detectChanges();
    this.errorMsg = null;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  setDataSource(organizations: Organization[]): any {
    this.organizationFrom.controls.recStatus.setValue(RecStatus.ACTIVE);
    this.dataSource = new MatTableDataSource<Organization>(organizations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  populateFields(row: Organization): void {
    this.organizationFrom.controls.recStatus.enable();
    this.organizationFrom.patchValue(row);
    this.organizationFrom.controls.type.setValue(this.organizationTypes[row.type]);
    this.organizationFrom.controls.recStatus.setValue(this.recStatus[row.recStatus]);
  }

  getEnumKeyByEnumValue(myEnum, enumValue): any {
    const keys = Object.keys(myEnum).filter(x => myEnum[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
  }

  onSubmit(): void {
    this.successMsg = null;
    if (!this.organizationFrom.invalid) {
      const payload = this.organizationFrom.getRawValue();
      if (payload.id > 0) {
        this.store.dispatch({type: OrganizationAction.UPDATE, payload});
      } else {
        this.store.dispatch({type: OrganizationAction.SAVE, payload});
      }
    }
  }

  ngOnDestroy(): void {
    this.destroySub.next();
    this.destroySub.complete();
    this.store.dispatch({type: OrganizationAction.RESET});
  }
}
