import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTimeDiscountComponent } from './new-time-discount.component';

describe('NewTimeDiscountComponent', () => {
  let component: NewTimeDiscountComponent;
  let fixture: ComponentFixture<NewTimeDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTimeDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTimeDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
