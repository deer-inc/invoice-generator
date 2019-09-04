import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [
        SharedModule,
        RouterModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('フォームアイテムが削除されること', () => {
    component.removeMenu(0);
    expect(component.menues.length === 0).toBeTruthy();
  });

  it('画像が削除されること', () => {
    component.removeImage('logo');
    expect(!component.form.value.company.logo).toBeTruthy();
  });
});
