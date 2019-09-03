import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { take, filter, skip } from 'rxjs/operators';
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
import { ActivatedRoute, Router } from '@angular/router';

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
    private route: ActivatedRoute,
    private router: Router
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
      const data = Object.assign({}, value);
      delete data.limit;
      delete data.menues;
      delete data.client;
      localStorage.setItem('lastData', JSON.stringify(data));
      this.invoiceService.updateValidStatus(this.form.valid);
      this.setQueryParams();
    });
  }

  setQueryParams() {
    const value = this.form.value;
    const query: any = {};

    if (value.client && value.client.name) {
      query.for = value.client.name;
    }

    if (value.menues) {
      let i = 0;
      value.menues.forEach(menu => {
        if (menu && menu.title) {
          Object.keys(menu).forEach(key => {
            query[key + (i || '')] = menu[key];
          });
          i++;
        }
      });
      this.route.queryParams.subscribe(params => {
        const p = (key, index) => params[key + (index || '')];
        for (; p('title', i) || p('unit', i) || p('unitCost', i) || p('count', i) || p('taxRate', i); i++) {
          query['title' + (i || '')] = null;
          query['unit' + (i || '')] = null;
          query['unitCost' + (i || '')] = null;
          query['count' + (i || '')] = null;
          query['taxRate' + (i || '')] = null;
        }
      });
    }

    if (Object.keys(query).length > 0) {
      this.router.navigate([],
        {
          relativeTo: this.route,
          queryParams: query,
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  ngOnInit() {
    this.dataChanged.emit(this.form.value);

    this.route.queryParams.pipe(
      skip(1),
      take(1),
    ).subscribe(params => {
      const value: any = { menues: [] };
      const p = (key, index) => params[key + (index || '')];
      for (let i = 0; p('title', i) || p('unit', i) || p('unitCost', i) || p('count', i) || p('taxRate', i); i++) {
        value.menues.push({
          title: p('title', i),
          unit: p('unit', i),
          unitCost: parseInt(p('unitCost', i), 10),
          count: parseInt(p('count', i), 10),
          taxRate: parseInt(p('taxRate', i), 10)
        });
      }
      while (this.menues.length < value.menues.length) {
        this.addMenu();
      }
      if (params.for) {
        value.client = {
          name: params.for
        };
      }
      this.form.patchValue(value);
    });
  }

  addMenu() {
    this.menues.push(
      this.fb.group(
        {
          title: '',
          count: '',
          unit: '人日',
          unitCost: 0,
          taxRate: ((new Date('October 1 2019')) < new Date()) ? 10 : 8
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
