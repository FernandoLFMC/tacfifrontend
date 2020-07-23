import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosListComponent } from './otros-list.component';

describe('OtrosListComponent', () => {
  let component: OtrosListComponent;
  let fixture: ComponentFixture<OtrosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
