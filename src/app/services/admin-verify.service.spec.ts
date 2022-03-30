import { TestBed } from '@angular/core/testing';

import { AdminVerifyService } from './admin-verify.service';

describe('AdminVerifyService', () => {
  let service: AdminVerifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminVerifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
