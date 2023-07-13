import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultInforComponent } from './default-infor.component';

describe('DefaultInforComponent', () => {
  let component: DefaultInforComponent;
  let fixture: ComponentFixture<DefaultInforComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultInforComponent]
    });
    fixture = TestBed.createComponent(DefaultInforComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
