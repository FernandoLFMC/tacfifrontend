import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoCuentaComponent } from './crear-tipo-cuenta.component';

describe('CrearTipoCuentaComponent', () => {
  let component: CrearTipoCuentaComponent;
  let fixture: ComponentFixture<CrearTipoCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTipoCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
