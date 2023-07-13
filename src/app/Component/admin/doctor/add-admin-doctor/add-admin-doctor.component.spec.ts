import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminDoctorComponent } from './add-admin-doctor.component';

describe('AddAdminDoctorComponent', () => {
  let component: AddAdminDoctorComponent;
  let fixture: ComponentFixture<AddAdminDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAdminDoctorComponent]
    });
    fixture = TestBed.createComponent(AddAdminDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
