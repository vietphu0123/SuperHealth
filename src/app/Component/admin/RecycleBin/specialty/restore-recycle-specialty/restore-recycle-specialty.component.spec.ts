import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoreRecycleSpecialtyComponent } from './restore-recycle-specialty.component';

describe('RestoreRecycleSpecialtyComponent', () => {
  let component: RestoreRecycleSpecialtyComponent;
  let fixture: ComponentFixture<RestoreRecycleSpecialtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RestoreRecycleSpecialtyComponent]
    });
    fixture = TestBed.createComponent(RestoreRecycleSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
