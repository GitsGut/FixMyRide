import { TestBed } from '@angular/core/testing';

import { VehicleAiService } from './vehicle-ai.service';

describe('VehicleAiService', () => {
  let service: VehicleAiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleAiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
