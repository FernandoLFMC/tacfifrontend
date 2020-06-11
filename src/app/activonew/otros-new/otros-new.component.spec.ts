import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosNewComponent } from './otros-new.component';

describe('OtrosNewComponent', () => {
  let component: OtrosNewComponent;
  let fixture: ComponentFixture<OtrosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtrosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtrosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
