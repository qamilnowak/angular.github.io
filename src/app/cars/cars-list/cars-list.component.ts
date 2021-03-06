import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';

import {Car} from '../models/car';
import {TotalcostComponent} from '../totalcost/totalcost.component';
import {CarsService} from '../cars.service';
import {Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CostSharedService} from '../cost-shared.service';
import {CarTableRowComponent} from '../car-table-row/car-table-row.component';
import {CsValidators} from '../../shared-module/validators/cs-validators';
import {CanComponentDeactivate} from '../../guards/form-can-deactivate.guard';


@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CarsListComponent implements OnInit, AfterViewInit, CanComponentDeactivate {
  @ViewChild('totalCostRef') totalCostRef: TotalcostComponent;
  @ViewChild('addCarTitle') addCarTitle: ElementRef;
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

      isFullyDamaged: '',
      year: '',
      parts: this.formBuilder.array([])
    });
  }

  buildParts(): FormGroup {
    return this.formBuilder.group({
      name: '',
      inStock: true,
      price: ''
    });
  }

  get parts(): FormArray {
    return <FormArray>this.carForm.get('parts');
  }

  addPart(): void {
    this.parts.push(this.buildParts());
  }
  removePart (i): void {
  this.parts.removeAt(i);
  }

  togglePlateValidity() {
    const damageControl = this.carForm.get('isFullyDamaged');
    const plateControl = this.carForm.get('plate');
    if (damageControl.value) {
      plateControl.clearValidators();
    } else {
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
    const carFormData = Object.assign({}, this.carForm.value);
    carFormData.cost = this.getPartsCost(carFormData.parts);
    this.carsService.addCar(carFormData).subscribe(() => {
      this.loadCars();
    });
  }

  getPartsCost(parts) {
    return parts.reduce ((prev, nextPart) => {
      return parseFloat(prev) + parseFloat(nextPart.price);
    }, 0);
  }

  ngAfterViewInit() {
    const addCarTitle = this.addCarTitle.nativeElement;
this.carForm.valueChanges.subscribe(() => {
  if (this.carForm.invalid) {
    addCarTitle.style.color = 'red';
  }else {
    addCarTitle.style.color = 'white';
  }
});

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
  canDeactivate() {
    if (!this.carForm.dirty) {
      return true;
    }
    return window.confirm('Discard changes ?');
  }
}
