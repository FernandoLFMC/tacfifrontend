import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacionNewComponent } from './instalacion-new.component';

describe('InstalacionNewComponent', () => {
  let component: InstalacionNewComponent;
  let fixture: ComponentFixture<InstalacionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalacionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalacionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
