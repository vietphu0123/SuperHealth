import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InforresultComponent } from './inforresult.component';

describe('InforresultComponent', () => {
  let component: InforresultComponent;
  let fixture: ComponentFixture<InforresultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InforresultComponent]
    });
    fixture = TestBed.createComponent(InforresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
