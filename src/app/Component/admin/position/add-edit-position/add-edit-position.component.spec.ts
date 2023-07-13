import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPositionComponent } from './add-edit-position.component';

describe('AddEditPositionComponent', () => {
  let component: AddEditPositionComponent;
  let fixture: ComponentFixture<AddEditPositionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditPositionComponent]
    });
    fixture = TestBed.createComponent(AddEditPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
