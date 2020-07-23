import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviliarioListComponent } from './moviliario-list.component';

describe('MoviliarioListComponent', () => {
  let component: MoviliarioListComponent;
  let fixture: ComponentFixture<MoviliarioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviliarioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviliarioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
