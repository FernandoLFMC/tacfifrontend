import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviliarioNewComponent } from './moviliario-new.component';

describe('MoviliarioNewComponent', () => {
  let component: MoviliarioNewComponent;
  let fixture: ComponentFixture<MoviliarioNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviliarioNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviliarioNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
