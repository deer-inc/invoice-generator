import { Component, OnInit, Input } from '@angular/core';
import { Invoice, InvoiceService } from '../invoice.service';

export interface TotalWithTax {
  taxRate: number;
  totalCost: number;
  tax: number;
}
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  @Input() data: Invoice;

  constructor(private invoiceService: InvoiceService) { }

  get totalCost() {
    return this.data && this.data.menues
      .map(menu => menu.count * menu.unitCost)
      .reduce((pv, cv) => pv + cv, 0);
  }

  get totalTax(): number {
    return this.totalsByTaxRate
      .map(t => t.tax)
      .reduce((pv, cv) => pv + cv, 0);
  }

  get totalsByTaxRate(): TotalWithTax[] {
    const totals = {};
    if (this.data) {
      this.data.menues
        .map(menu => [menu.taxRate, menu.count * menu.unitCost])
        .forEach(p => totals[p[0]] = (totals[p[0]] || 0) + p[1]);
    }

    return Object.keys(totals).map(rate => {
      const tr = parseInt(rate, 10);
      const tc = totals[rate];
      return {
        taxRate: tr,
        totalCost: tc,
        tax: Math.trunc(tc * tr / 100)
      };
    }).sort((a, b) => b.taxRate - a.taxRate);
  }

  ngOnInit() {
  }

  setTarget(target: string) {
    this.invoiceService.setTarget(target);
  }

}
