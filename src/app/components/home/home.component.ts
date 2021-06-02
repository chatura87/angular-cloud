import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';
import {AppState, selectAuthState} from '../../app.states';
import {AuthActionTypes} from '../../store/actions/auth.actions';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  getState: Observable<any>;
  isSidebarOpen: boolean;
  @ViewChild('sidenav') sideNav: MatSidenav;

  constructor(private router: Router,
              private translate: TranslateService,
              private store: Store<AppState>,
              private authService: AuthService) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit(): void {
  }

  navigate(path): void {
    this.router.navigate([{outlets: {sidemenu: path}}],
      {relativeTo: null});
  }

  logout(): void {
    const username = this.authService.getLoggedInUser().login;
    const payload = {username, authString: localStorage.getItem('token')};
    this.store.dispatch({type: AuthActionTypes.LOG_OUT, payload});
  }

  openSideNav(): void {
    this.sideNav.toggle();
  }
}
