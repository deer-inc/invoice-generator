import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormComponent } from './form/form.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { RouterModule } from '@angular/router';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FormComponent,
        InvoiceComponent,
      ],
      imports: [
        SharedModule,
        RouterModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('ローカルストレージがクリアされること', () => {
    localStorage.setItem('test', 'demo');
    component.clearCache();
    expect(!localStorage.getItem('test')).toBeTruthy();
  });
});
