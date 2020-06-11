import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerrenosListComponent } from './terrenos-list.component';

describe('TerrenosListComponent', () => {
  let component: TerrenosListComponent;
  let fixture: ComponentFixture<TerrenosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerrenosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerrenosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
