import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalcostComponent } from './totalcost/totalcost.component';
import {SharedModule} from '../shared-module/shared.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule
  ],
  exports: [CarsListComponent],
  declarations: [CarsListComponent, TotalcostComponent, CarDetailsComponent]
})
export class CarsModule { }
