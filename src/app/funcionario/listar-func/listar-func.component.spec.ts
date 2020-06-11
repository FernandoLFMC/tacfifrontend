import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFuncComponent } from './listar-func.component';

describe('ListarFuncComponent', () => {
  let component: ListarFuncComponent;
  let fixture: ComponentFixture<ListarFuncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarFuncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFuncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
