import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackendTypeComponent } from './backend-type.component';

describe('BackendTypeComponent', () => {
  let component: BackendTypeComponent;
  let fixture: ComponentFixture<BackendTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackendTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackendTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
