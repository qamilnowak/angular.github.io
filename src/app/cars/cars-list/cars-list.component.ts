import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {Car} from '../models/car';
import {TotalcostComponent} from '../totalcost/totalcost.component';
import {CarsService} from '../cars.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit {
  @ViewChild('totalCostRef') totalCostRef: TotalcostComponent;
  totalCost: number;
  grossCost: number;
  cars: Car[];

  constructor(private carsService: CarsService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadCars();
  }

  loadCars(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.countTotalCost();
    });
  }

  ngAfterViewInit() {
    this.totalCostRef.showGross();
  }
  goToCarDetails(car: Car) {
    this.router.navigate(['/cars', car.id]);
  }
  showGross(): void {
    this.totalCostRef.showGross();
  }

  countTotalCost(): void {
    this.totalCost = this.cars
      .map((car) => car.cost) // [300,400,600]
      .reduce((prev, next) => prev + next);
  }

  onShownGross(grossCost: number): void {
    this.grossCost = grossCost;
  }

}
