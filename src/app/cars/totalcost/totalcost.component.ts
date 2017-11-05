import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-totalcost',
  templateUrl: './totalcost.component.html',
  styleUrls: ['./totalcost.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalcostComponent {
  @Input() totalCost: number;
  @Output() shownGross: EventEmitter<number> = new EventEmitter<number>();
  VAT: number = 1.23;
  showGross(): void {
    setTimeout(() => {console.log('hey'); }, 1000);
    this.shownGross.emit(this.totalCost * this.VAT);
  }
}
