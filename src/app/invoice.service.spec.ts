import { TestBed } from '@angular/core/testing';

import { InvoiceService } from './invoice.service';

describe('InvoiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvoiceService = TestBed.get(InvoiceService);
    expect(service).toBeTruthy();
  });

  it('ターゲットが正しくセットされる', (done) => {
    const service: InvoiceService = TestBed.get(InvoiceService);
    service.setTarget('demoTarget');
    service.editTarget$.subscribe(target => {
      expect(target).toBe('demoTarget');
      done();
    });
  });
});
