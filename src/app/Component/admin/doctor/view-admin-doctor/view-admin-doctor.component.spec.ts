import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminDoctorComponent } from './view-admin-doctor.component';

describe('ViewAdminDoctorComponent', () => {
  let component: ViewAdminDoctorComponent;
  let fixture: ComponentFixture<ViewAdminDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAdminDoctorComponent]
    });
    fixture = TestBed.createComponent(ViewAdminDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
