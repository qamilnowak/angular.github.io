import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CarDetailsComponent} from './car-details/car-details.component';
import {CarResolve} from './car-resolve.service';
import {CarsListComponent} from './cars-list/cars-list.component';
import {CarsComponent} from './cars.component';
import {FromCanDeactivateGuard} from '../guards/form-can-deactivate.guard';

const CARS_ROUTES: Route[] = [
  {
   path: '',
   component: <any>CarsComponent,
    children: [
      {
        path: '',
        component: <any>CarsListComponent,
        canDeactivate: [FromCanDeactivateGuard]
      },
      {
        path: ':id',
        component: <any>CarDetailsComponent,
        resolve: {car: CarResolve}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(CARS_ROUTES)
  ],
  exports: [
    RouterModule
  ]
})

export class CarsRoutingModule {
}
