import { TestBed } from '@angular/core/testing';

import { RazorpayPaymentService } from './razorpay-payment.service';

describe('RazorpayPaymentService', () => {
  let service: RazorpayPaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RazorpayPaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
