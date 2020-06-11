import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivoListComponent } from './activo-list.component';

describe('ActivoListComponent', () => {
  let component: ActivoListComponent;
  let fixture: ComponentFixture<ActivoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
