import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreRecyclePositionComponent } from './restore-recycle-position.component';

describe('RestoreRecyclePositionComponent', () => {
  let component: RestoreRecyclePositionComponent;
  let fixture: ComponentFixture<RestoreRecyclePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreRecyclePositionComponent]
    });
    fixture = TestBed.createComponent(RestoreRecyclePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
