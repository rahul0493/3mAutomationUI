import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerRestartComponent } from './server-restart.component';

describe('ServerRestartComponent', () => {
  let component: ServerRestartComponent;
  let fixture: ComponentFixture<ServerRestartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerRestartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerRestartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
