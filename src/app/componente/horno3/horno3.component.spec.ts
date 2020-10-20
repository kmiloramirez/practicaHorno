import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Horno3Component } from './horno3.component';

describe('Horno3Component', () => {
  let component: Horno3Component;
  let fixture: ComponentFixture<Horno3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Horno3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Horno3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
