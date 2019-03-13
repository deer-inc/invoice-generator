import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Invoice, InvoiceService } from '../invoice.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ja-JP'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class FormComponent implements OnInit {

  @Output() dataChanged: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  form: FormGroup;
  target$: Observable<string> = this.invoiceService.editTarget$;

  get menues(): FormArray {
    return this.form.get('menues') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {
    this.form = fb.group({
      id: Date.now(),
      date: new Date(),
      client: fb.group({
        name: ['', Validators.required],
        zipCode: '',
        streetName1: '',
      }),
      transferAccount: fb.group({
        bank: [''],
        name: [''],
        number: ['']
      }, Validators.required),
      company: fb.group({
        name: ['', Validators.required],
        zipCode: ['', Validators.required],
        streetName1: ['', Validators.required],
        logo: '',
        tel: ['', Validators.required],
        seal: '',
      }),
      menues: fb.array([
        fb.group({
            title: '',
            count: '',
            unit: '',
            unitCost: [0],
        }, Validators.required)
      ]),
      note: ''
    });

    this.form.valueChanges.subscribe((value: Invoice) => {
      this.dataChanged.emit(value);
    });
  }

  ngOnInit() {
    this.dataChanged.emit(this.form.value);
  }

}
