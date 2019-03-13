import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../invoice.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Output() dataChanged: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  form: FormGroup;

  get menues(): FormArray {
    return this.form.get('menues') as FormArray;
  }

  constructor(
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      id: Date.now(),
      date: Date.now(),
      client: fb.group({
        name: ['', Validators.required],
        zipCode: '',
        streetName1: '',
        streetName2: '',
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
        streetName2: '',
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
    })


    this.form.valueChanges.subscribe((value: Invoice) => {
      this.dataChanged.emit(value);
    });
  }

  ngOnInit() {
  }

}
