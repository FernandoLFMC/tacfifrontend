import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeccionComponent } from './list-seccion.component';

describe('ListSeccionComponent', () => {
  let component: ListSeccionComponent;
  let fixture: ComponentFixture<ListSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
