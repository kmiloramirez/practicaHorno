import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Horno4Component } from './horno4.component';

describe('Horno4Component', () => {
  let component: Horno4Component;
  let fixture: ComponentFixture<Horno4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Horno4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Horno4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
