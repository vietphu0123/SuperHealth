import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecyclePositionComponent } from './list-recycle-position.component';

describe('ListRecyclePositionComponent', () => {
  let component: ListRecyclePositionComponent;
  let fixture: ComponentFixture<ListRecyclePositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecyclePositionComponent]
    });
    fixture = TestBed.createComponent(ListRecyclePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
