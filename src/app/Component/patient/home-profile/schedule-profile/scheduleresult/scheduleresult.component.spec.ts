import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleresultComponent } from './scheduleresult.component';

describe('ScheduleresultComponent', () => {
  let component: ScheduleresultComponent;
  let fixture: ComponentFixture<ScheduleresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleresultComponent]
    });
    fixture = TestBed.createComponent(ScheduleresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
