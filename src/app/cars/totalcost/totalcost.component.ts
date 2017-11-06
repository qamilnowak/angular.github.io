import {Component, Input, EventEmitter, Output, ChangeDetectionStrategy, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-totalcost',
  templateUrl: './totalcost.component.html',
  styleUrls: ['./totalcost.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalcostComponent implements OnChanges {
  @Input() totalCost: number;
  @Output() shownGross: EventEmitter<number> = new EventEmitter<number>();
  VAT: number = 1.23;
  costThreshold: number = 10000;
  isCostTooLow: boolean = false;

  showGross(): void {
     setTimeout(() => {
     console.log('hey');
    }, 1000);
    this.shownGross.emit(this.totalCost * this.VAT);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isCostTooLow = changes['totalCost'].currentValue < this.costThreshold;
  }

}
