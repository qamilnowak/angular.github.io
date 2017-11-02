import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-totalcost',
  templateUrl: './totalcost.component.html',
  styleUrls: ['./totalcost.component.less']
})
export class TotalcostComponent {
  @Input() totalCost: number;
  @Output() shownGross: EventEmitter<number> = new EventEmitter<number>();
  VAT: number = 1.23;
  showGross(): void {
    this.shownGross.emit(this.totalCost * this.VAT);
  }
}
