import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorProfileSettingComponent } from './doctor-profile-setting.component';

describe('DoctorProfileSettingComponent', () => {
  let component: DoctorProfileSettingComponent;
  let fixture: ComponentFixture<DoctorProfileSettingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorProfileSettingComponent]
    });
    fixture = TestBed.createComponent(DoctorProfileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
