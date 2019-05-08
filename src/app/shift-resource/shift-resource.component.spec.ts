import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftResourceComponent } from './shift-resource.component';

describe('ShiftResourceComponent', () => {
  let component: ShiftResourceComponent;
  let fixture: ComponentFixture<ShiftResourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftResourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
