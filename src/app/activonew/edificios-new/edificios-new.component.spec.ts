import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiosNewComponent } from './edificios-new.component';

describe('EdificiosNewComponent', () => {
  let component: EdificiosNewComponent;
  let fixture: ComponentFixture<EdificiosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdificiosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
