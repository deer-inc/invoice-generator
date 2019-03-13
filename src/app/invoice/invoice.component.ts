import { Component, OnInit, Input } from '@angular/core';
import { Invoice, InvoiceService } from '../invoice.service';

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
      .reduce((pv, cv) => pv + cv);
  }

  ngOnInit() {
  }

  setTarget(target: string) {
    this.invoiceService.setTarget(target);
  }

}
