import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecialtyComponent } from './delete-specialty.component';

describe('DeleteSpecialtyComponent', () => {
  let component: DeleteSpecialtyComponent;
  let fixture: ComponentFixture<DeleteSpecialtyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteSpecialtyComponent]
    });
    fixture = TestBed.createComponent(DeleteSpecialtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
