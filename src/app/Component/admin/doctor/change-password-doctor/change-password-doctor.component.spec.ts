import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordDoctorComponent } from './change-password-doctor.component';

describe('ChangePasswordDoctorComponent', () => {
  let component: ChangePasswordDoctorComponent;
  let fixture: ComponentFixture<ChangePasswordDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordDoctorComponent]
    });
    fixture = TestBed.createComponent(ChangePasswordDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
