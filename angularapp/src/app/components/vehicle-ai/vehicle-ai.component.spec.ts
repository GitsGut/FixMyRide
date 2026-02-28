import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAiComponent } from './vehicle-ai.component';

describe('VehicleAiComponent', () => {
  let component: VehicleAiComponent;
  let fixture: ComponentFixture<VehicleAiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
