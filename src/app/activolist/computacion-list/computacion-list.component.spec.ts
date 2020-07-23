import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputacionListComponent } from './computacion-list.component';

describe('ComputacionListComponent', () => {
  let component: ComputacionListComponent;
  let fixture: ComponentFixture<ComputacionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputacionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
