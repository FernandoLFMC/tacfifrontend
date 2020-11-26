import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTipoCuentaComponent } from './list-tipo-cuenta.component';

describe('ListTipoCuentaComponent', () => {
  let component: ListTipoCuentaComponent;
  let fixture: ComponentFixture<ListTipoCuentaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTipoCuentaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTipoCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
