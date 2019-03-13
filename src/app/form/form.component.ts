import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Invoice, InvoiceService } from '../invoice.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';
import {
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS
} from '@angular/material';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_FORMATS
} from '@angular/material-moment-adapter';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
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
    private invoiceService: InvoiceService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      id: Date.now(),
      date: new Date(),
      limit: moment()
        .add(1, 'months')
        .endOf('month')
        .toDate(),
      client: fb.group({
        name: ['', Validators.required],
        zipCode: '',
        streetName: ''
      }),
      transferAccount: fb.group(
        {
          bank: ['', Validators.required],
          name: ['', Validators.required],
          branch: ['', Validators.required],
          number: ['', Validators.required]
        },
        Validators.required
      ),
      company: fb.group({
        name: ['', Validators.required],
        zipCode: ['', Validators.required],
        streetName: ['', Validators.required],
        logo: '',
        tel: ['', Validators.required],
        seal: ''
      }),
      menues: fb.array([]),
      note: ''
    });

    if (localStorage.getItem('lastData')) {
      this.form.patchValue(JSON.parse(localStorage.getItem('lastData')));
    }

    this.form.valueChanges.subscribe((value: Invoice) => {
      this.dataChanged.emit(value);
      localStorage.setItem('lastData', JSON.stringify(value));
      this.invoiceService.updateValidStatus(this.form.valid);
    });
  }

  ngOnInit() {
    this.dataChanged.emit(this.form.value);

    if (!this.menues.length) {
      this.addMenu();
    }

    this.route.queryParams.subscribe(params => {
      if (params.title && params.unit && params.unitCost && params.count) {
        this.form.patchValue({
          menues: [
            params
          ]
        });
      }
    });
  }

  addMenu() {
    this.menues.push(
      this.fb.group(
        {
          title: '',
          count: '',
          unit: '人日',
          unitCost: 0
        },
        Validators.required
      )
    );
  }

  removeMenu(i: number) {
    this.menues.removeAt(i);
  }

  onChangeImage(file, target: string) {
    const url = window.URL.createObjectURL(file);
    let safeUrl;

    if (target === 'logo') {
      safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      safeUrl = this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
    }

    this.form.patchValue({
      company: {
        [target]: safeUrl
      }
    });
  }

  removeImage(target: string) {
    this.form.patchValue({
      company: {
        [target]: null
      }
    });
  }
}
