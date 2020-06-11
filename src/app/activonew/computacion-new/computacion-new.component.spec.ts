import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputacionNewComponent } from './computacion-new.component';

describe('ComputacionNewComponent', () => {
  let component: ComputacionNewComponent;
  let fixture: ComponentFixture<ComputacionNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputacionNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputacionNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
