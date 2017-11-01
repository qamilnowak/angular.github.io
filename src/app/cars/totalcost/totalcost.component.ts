import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-totalcost',
  templateUrl: './totalcost.component.html',
  styleUrls: ['./totalcost.component.less']
})
export class TotalcostComponent {
  @Input() totalCost: number;
}
