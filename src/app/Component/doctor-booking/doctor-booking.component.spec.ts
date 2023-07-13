import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBookingComponent } from './doctor-booking.component';

describe('DoctorBookingComponent', () => {
  let component: DoctorBookingComponent;
  let fixture: ComponentFixture<DoctorBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorBookingComponent]
    });
    fixture = TestBed.createComponent(DoctorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
