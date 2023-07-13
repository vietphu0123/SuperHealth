import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdminDoctorComponent } from './delete-admin-doctor.component';

describe('DeleteAdminDoctorComponent', () => {
  let component: DeleteAdminDoctorComponent;
  let fixture: ComponentFixture<DeleteAdminDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteAdminDoctorComponent]
    });
    fixture = TestBed.createComponent(DeleteAdminDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
