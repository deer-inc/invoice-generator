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
  styleUrls: ['./invoice.component.scss'],
})
export class InvoiceComponent implements OnInit {
  @Input() data: Invoice;

  constructor(private invoiceService: InvoiceService) {}

  get totalCost() {
    return (
      this.data &&
      this.data.menues
        .map((menu) => menu.count * menu.unitCost)
        .reduce((pv, cv) => pv + cv, 0)
    );
  }

  get totalTax(): number {
    return this.totalsByTaxRate
      .map((t) => t.tax)
      .reduce((pv, cv) => pv + cv, 0);
  }

  get totalsByTaxRate(): TotalWithTax[] {
    const totals = {};
    if (this.data) {
      this.data.menues.forEach((menu) => {
        totals[menu.taxRate] =
          (totals[menu.taxRate] || 0) + menu.count * menu.unitCost;
      });
    }

    return Object.keys(totals)
      .map((rate) => {
        const taxRate = parseInt(rate, 10);
        const totalCost = totals[rate];
        let tax: number;

        if (this.data.taxExemption) {
          tax = Math.floor((totalCost * taxRate) / 100);
        } else {
          if (taxRate === 8) {
            tax = totalCost / 13.5;
          } else if (taxRate === 10) {
            tax = totalCost / 11;
          }
        }

        return {
          taxRate,
          totalCost,
          tax,
        };
      })
      .sort((a, b) => b.taxRate - a.taxRate);
  }

  ngOnInit() {}

  setTarget(target: string) {
    this.invoiceService.setTarget(target);
  }
}
