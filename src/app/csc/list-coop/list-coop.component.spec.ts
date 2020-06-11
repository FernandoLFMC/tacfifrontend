import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCoopComponent } from './list-coop.component';

describe('ListCoopComponent', () => {
  let component: ListCoopComponent;
  let fixture: ComponentFixture<ListCoopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCoopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
