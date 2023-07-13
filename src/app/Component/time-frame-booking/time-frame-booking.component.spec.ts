import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFrameBookingComponent } from './time-frame-booking.component';

describe('TimeFrameBookingComponent', () => {
  let component: TimeFrameBookingComponent;
  let fixture: ComponentFixture<TimeFrameBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeFrameBookingComponent]
    });
    fixture = TestBed.createComponent(TimeFrameBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
