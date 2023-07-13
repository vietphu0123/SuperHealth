import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleProfileComponent } from './schedule-profile.component';

describe('ScheduleProfileComponent', () => {
  let component: ScheduleProfileComponent;
  let fixture: ComponentFixture<ScheduleProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleProfileComponent]
    });
    fixture = TestBed.createComponent(ScheduleProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
