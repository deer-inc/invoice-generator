import { Component, OnInit } from '@angular/core';
import { Invoice } from '../invoice.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  data: Invoice;

  constructor() { }

  ngOnInit() {
  }

}
