import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {CarsModule} from './cars/cars.module';
import {HttpModule} from '@angular/http';
import {CarsService} from './cars/cars.service';
import {CoreModule} from './core-module/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CarsModule,
    CoreModule
  ],
  providers: [CarsService],
  bootstrap: [AppComponent]
})
export class AppModule {
  title = 'app';
}
