import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearSeccionComponent } from './crear-seccion.component';

describe('CrearSeccionComponent', () => {
  let component: CrearSeccionComponent;
  let fixture: ComponentFixture<CrearSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
