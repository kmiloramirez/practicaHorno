import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HornoComponent } from './horno.component';

describe('HornoComponent', () => {
  let component: HornoComponent;
  let fixture: ComponentFixture<HornoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HornoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HornoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
