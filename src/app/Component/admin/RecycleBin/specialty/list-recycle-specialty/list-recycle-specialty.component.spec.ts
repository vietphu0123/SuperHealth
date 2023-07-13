import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRecycleSpecialtyComponents } from './list-recycle-specialty.component';

describe('ListRecycleSpecialtyComponent', () => {
  let component: ListRecycleSpecialtyComponents;
  let fixture: ComponentFixture<ListRecycleSpecialtyComponents>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListRecycleSpecialtyComponents]
    });
    fixture = TestBed.createComponent(ListRecycleSpecialtyComponents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
