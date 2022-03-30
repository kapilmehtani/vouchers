import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyVouchersComponent } from './verify-vouchers.component';

describe('VerifyVouchersComponent', () => {
  let component: VerifyVouchersComponent;
  let fixture: ComponentFixture<VerifyVouchersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyVouchersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyVouchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
