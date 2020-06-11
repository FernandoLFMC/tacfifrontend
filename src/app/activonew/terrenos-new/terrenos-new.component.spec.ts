import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrenosNewComponent } from './terrenos-new.component';

describe('TerrenosNewComponent', () => {
  let component: TerrenosNewComponent;
  let fixture: ComponentFixture<TerrenosNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrenosNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrenosNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
