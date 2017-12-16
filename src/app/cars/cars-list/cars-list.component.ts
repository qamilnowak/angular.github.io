import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';

import {Car} from '../models/car';
import {TotalcostComponent} from '../totalcost/totalcost.component';
import {CarsService} from '../cars.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CostSharedService} from '../cost-shared.service';
import {CarTableRowComponent} from '../car-table-row/car-table-row.component';
import {CsValidators} from '../../shared-module/validators/cs-validators';


@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit {
  @ViewChild('totalCostRef') totalCostRef: TotalcostComponent;
  @ViewChildren(CarTableRowComponent) carRows: QueryList<CarTableRowComponent>;
  totalCost: number;
  grossCost: number;
  cars: Car[];
  carForm: FormGroup;

  constructor(private carsService: CarsService,
              private formBuilder: FormBuilder,
              private costSharedService: CostSharedService,
              private router: Router) {
  }

  ngOnInit() {
    this.loadCars();
    this.carForm = this.buildCarForm();
  }


  buildCarForm() {
    return this.formBuilder.group({
      model: ['', Validators.required],
      type: '',
      plate: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(7)]],
      deliveryDate: '',
      deadline: '',
      color: '',
      power: ['', CsValidators.power],
      clientFirstName: '',
      clientSurname: '',
      cost: '',
      isFullyDamaged: '',
      year: '',
    });
  }

  togglePlateValidity() {
    const damageControl = this.carForm.get('isFullyDamaged');
    const plateControl = this.carForm.get('plate');
    if (damageControl.value) {
      plateControl.clearValidators();
    }else {
      plateControl.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(7)]);
    }
    plateControl.updateValueAndValidity();
  }

  onRemovedCar(car: Car) {
    this.carsService.removeCar(car.id).subscribe(() => {
      this.loadCars();
    });
  }

  loadCars(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.cars = cars;
      this.countTotalCost();
      this.costSharedService.shareCost(this.totalCost);
    });
  }

  addCar() {
    this.carsService.addCar(this.carForm.value).subscribe((cars) => {
      this.loadCars();
    });
  }

  ngAfterViewInit() {
    this.totalCostRef.showGross();
    this.carRows.changes.subscribe(() => {
      if (this.carRows.first.car.clientSurname === 'Kowalski') {
        console.log('Warning, Client Kowalski is next in queue');
      }
    });

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
