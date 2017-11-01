import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarsListComponent } from './cars-list/cars-list.component';
import { TotalcostComponent } from './totalcost/totalcost.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [CarsListComponent],
  declarations: [CarsListComponent, TotalcostComponent]
})
export class CarsModule { }
