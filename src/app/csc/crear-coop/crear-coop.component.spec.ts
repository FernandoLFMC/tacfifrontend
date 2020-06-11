import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCoopComponent } from './crear-coop.component';

describe('CrearCoopComponent', () => {
  let component: CrearCoopComponent;
  let fixture: ComponentFixture<CrearCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
