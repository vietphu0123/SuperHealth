import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfornewComponent } from './infornew.component';

describe('InfornewComponent', () => {
  let component: InfornewComponent;
  let fixture: ComponentFixture<InfornewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfornewComponent]
    });
    fixture = TestBed.createComponent(InfornewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
