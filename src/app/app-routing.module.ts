import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarsListComponent} from './cars/cars-list/cars-list.component';
import {AuthGuard} from './auth/auth.guard';

const APP_ROUTES: Route[] = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'cars', loadChildren: 'app/cars/cars.module#CarsModule'}
  ];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)
    ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
