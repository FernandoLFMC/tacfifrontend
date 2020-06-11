import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdquiComponent } from './crear-adqui.component';

describe('CrearAdquiComponent', () => {
  let component: CrearAdquiComponent;
  let fixture: ComponentFixture<CrearAdquiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearAdquiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAdquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
