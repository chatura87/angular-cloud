import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {HomeComponent} from './components/home/home.component';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {OrganizationComponent} from './components/organization/organization.component';
import {UnderConstructionComponent} from './under-construction/under-construction.component';
import {UserComponent} from './components/user/user.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'reset-password/:id', component: ResetPasswordComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: 'home', canActivate: [AuthGuardService], component: HomeComponent, children: [
      {path: 'organization', canActivate: [AuthGuardService], component: OrganizationComponent},
      {path: 'user', canActivate: [AuthGuardService], component: UserComponent},
      {path: 'under-construction', canActivate: [AuthGuardService], component: UnderConstructionComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
