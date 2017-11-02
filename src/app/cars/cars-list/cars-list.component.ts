import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {Car} from '../models/car';
import {TotalcostComponent} from '../totalcost/totalcost.component';

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
  cars: Car[] = [
    {
      id: 1,
      model: 'Mazda Rx7',
      plate: 'GD2121E',
      deliveryDate: '21-04-2017',
      deadline: '05-05-2016',
      client: {
        firstName: 'Jan',
        surname: 'Kowalski'
      },
      cost: 300,
      isFullyDamaged: true
    },
    {
      id: 2,
      model: 'Mercedes 124',
      plate: 'KRK2200',
      deliveryDate: '24-05-2017',
      deadline: '03-06-2016',
      client: {
        firstName: 'Michał',
        surname: 'Nowak'
      },
      cost: 1200,
      isFullyDamaged: false
    },
    {
      id: 3,
      model: 'Renault CLIO',
      plate: 'GWE22011',
      deliveryDate: '02-02-2017',
      deadline: '03-03-2017',
      client: {
        firstName: 'Beata',
        surname: 'Dampc'
      },
      cost: 2800,
      isFullyDamaged: true
    }
  ];

  constructor() {
  }

  ngOnInit() {
    this.countTotalCost();
  }

  ngAfterViewInit() {
    this.totalCostRef.showGross();
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
