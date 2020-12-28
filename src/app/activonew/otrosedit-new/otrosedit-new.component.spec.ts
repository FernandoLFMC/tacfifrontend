import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroseditNewComponent } from './otrosedit-new.component';

describe('OtroseditNewComponent', () => {
  let component: OtroseditNewComponent;
  let fixture: ComponentFixture<OtroseditNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtroseditNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtroseditNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
