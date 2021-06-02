import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {AngularMaterialModule} from './angular-material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {AuthEffects} from './store/effects/auth.effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.states';
import {Interceptor} from './services/interceptor';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {EnumToArrayPipe} from './pipes/enum-to-array.pipe';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {ResetPasswordEffects} from './store/effects/reset-password.effects';
import {RecaptchaFormsModule, RecaptchaModule} from 'ng-recaptcha';
import {HomeComponent} from './components/home/home.component';
import {OrganizationComponent} from './components/organization/organization.component';
import {UnderConstructionComponent} from './under-construction/under-construction.component';
import {OrganizationEffects} from './store/effects/organization.effects';
import {FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {UserComponent} from './components/user/user.component';
import {UserEffects} from './store/effects/user.effects';


// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    EnumToArrayPipe,
    HomeComponent,
    OrganizationComponent,
    UnderConstructionComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    EffectsModule.forRoot([AuthEffects, ResetPasswordEffects, OrganizationEffects, UserEffects]),
    StoreModule.forRoot(reducers, {}),
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClient]}
    }),
    FlexLayoutModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
