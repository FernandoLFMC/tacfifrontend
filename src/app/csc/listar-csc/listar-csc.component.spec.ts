import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCscComponent } from './listar-csc.component';

describe('ListarCscComponent', () => {
  let component: ListarCscComponent;
  let fixture: ComponentFixture<ListarCscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
