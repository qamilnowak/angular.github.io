import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {CarsModule, CarsRoutingModule, CarsService} from './cars/index';
import { AppComponent } from './app.component';
import {CoreModule} from './core-module/core.module';
import {AppRoutingModule} from './app-routing.module';
import {LoginRoutingModule} from './login/login-routing.module';
import {LoginModule} from './login/login.module';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';
import {LayoutService} from './shared-module/services/layout.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarsModule,
    LoginModule,
    CoreModule,
    AppRoutingModule,
    CarsRoutingModule,
    LoginRoutingModule
  ],
  providers: [CarsService, AuthService, AuthGuard, LayoutService],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'app';
}
