import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionMensualComponent } from './depreciacion-mensual.component';

describe('DepreciacionMensualComponent', () => {
  let component: DepreciacionMensualComponent;
  let fixture: ComponentFixture<DepreciacionMensualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepreciacionMensualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciacionMensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
