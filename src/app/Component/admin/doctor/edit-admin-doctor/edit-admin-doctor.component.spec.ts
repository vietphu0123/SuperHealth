import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdminDoctorComponent } from './edit-admin-doctor.component';

describe('EditAdminDoctorComponent', () => {
  let component: EditAdminDoctorComponent;
  let fixture: ComponentFixture<EditAdminDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdminDoctorComponent]
    });
    fixture = TestBed.createComponent(EditAdminDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
