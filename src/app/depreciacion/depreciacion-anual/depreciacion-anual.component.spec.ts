import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepreciacionAnualComponent } from './depreciacion-anual.component';

describe('DepreciacionAnualComponent', () => {
  let component: DepreciacionAnualComponent;
  let fixture: ComponentFixture<DepreciacionAnualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepreciacionAnualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepreciacionAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
