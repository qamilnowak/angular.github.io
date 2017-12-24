import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CarsService} from './cars/index';
import { AppComponent } from './app.component';
import {CoreModule} from './core-module/core.module';
import {AppRoutingModule} from './app-routing.module';

import {LoginModule} from './login/login.module';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './guards/auth.guard';
import {LayoutService} from './shared-module/services/layout.service';
import {AuthCanLoadGuard} from './guards/auth-can-load.guard';
import {FromCanDeactivateGuard} from './guards/form-can-deactivate.guard';
import {SharedModule} from './shared-module/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LoginModule,
    CoreModule,
    AppRoutingModule,
    SharedModule

  ],
  providers: [CarsService, AuthService, AuthGuard, LayoutService, AuthCanLoadGuard, FromCanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'app';
}
