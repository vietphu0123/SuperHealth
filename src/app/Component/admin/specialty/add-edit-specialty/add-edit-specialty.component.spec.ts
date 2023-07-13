import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSpecialtyComponent } from './add-edit-specialty.component';

describe('AddEditSpecialtyComponent', () => {
  let component: AddEditSpecialtyComponent;
  let fixture: ComponentFixture<AddEditSpecialtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSpecialtyComponent]
    });
    fixture = TestBed.createComponent(AddEditSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
