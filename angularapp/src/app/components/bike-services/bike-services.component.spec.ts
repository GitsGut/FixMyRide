import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BikeServicesComponent } from './bike-services.component';

describe('BikeServicesComponent', () => {
  let component: BikeServicesComponent;
  let fixture: ComponentFixture<BikeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BikeServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BikeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
