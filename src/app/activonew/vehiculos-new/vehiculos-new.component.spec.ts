import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosNewComponent } from './vehiculos-new.component';

describe('VehiculosNewComponent', () => {
  let component: VehiculosNewComponent;
  let fixture: ComponentFixture<VehiculosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
