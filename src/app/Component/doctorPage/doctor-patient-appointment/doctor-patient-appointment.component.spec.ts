import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientAppointmentComponent } from './doctor-patient-appointment.component';

describe('DoctorPatientAppointmentComponent', () => {
  let component: DoctorPatientAppointmentComponent;
  let fixture: ComponentFixture<DoctorPatientAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorPatientAppointmentComponent]
    });
    fixture = TestBed.createComponent(DoctorPatientAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
