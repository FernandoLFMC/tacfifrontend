import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFuncComponent } from './crear-func.component';

describe('CrearFuncComponent', () => {
  let component: CrearFuncComponent;
  let fixture: ComponentFixture<CrearFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearFuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
