import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Car} from '../models/car';
@Component({
  selector: '[app-car-table-row]',
  templateUrl: './car-table-row.component.html'
})
export class CarTableRowComponent {
  @Input() car: Car;
  @Output() removedCar = new EventEmitter();

  removeCar (car, event) {
    event.stopPropagation();
    this.removedCar.emit(car);
  }
}
