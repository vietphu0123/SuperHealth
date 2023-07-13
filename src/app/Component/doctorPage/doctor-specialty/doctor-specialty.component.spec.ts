import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSpecialtyComponent } from './doctor-specialty.component';

describe('DoctorSpecialtyComponent', () => {
  let component: DoctorSpecialtyComponent;
  let fixture: ComponentFixture<DoctorSpecialtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorSpecialtyComponent]
    });
    fixture = TestBed.createComponent(DoctorSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
