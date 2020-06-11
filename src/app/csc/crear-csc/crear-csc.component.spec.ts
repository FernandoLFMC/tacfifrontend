import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCscComponent } from './crear-csc.component';

describe('CrearCscComponent', () => {
  let component: CrearCscComponent;
  let fixture: ComponentFixture<CrearCscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
