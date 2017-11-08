import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalcostComponent } from './totalcost/totalcost.component';
import {SharedModule} from '../shared-module/shared.module';
import { CarDetailsComponent } from './car-details/car-details.component';
import {RouterModule} from '@angular/router';
import {CarResolve} from './car-resolve.service';
import {ReactiveFormsModule} from '@angular/forms';
import {IncomeTaxComponent} from './totalcost/income-tax/income-tax.component';


@NgModule({
  imports: [
    CommonModule, SharedModule, RouterModule, ReactiveFormsModule
  ],
  exports: [CarsListComponent],
  providers: [CarResolve],
  declarations: [CarsListComponent, TotalcostComponent, CarDetailsComponent, IncomeTaxComponent]
})
export class CarsModule { }
