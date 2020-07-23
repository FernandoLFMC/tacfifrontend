import { TestBed } from '@angular/core/testing';

import { ExportxlsxService } from './exportxlsx.service';

describe('ExportxlsxService', () => {
  let service: ExportxlsxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportxlsxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
