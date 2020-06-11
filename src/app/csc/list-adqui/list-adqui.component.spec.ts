import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdquiComponent } from './list-adqui.component';

describe('ListAdquiComponent', () => {
  let component: ListAdquiComponent;
  let fixture: ComponentFixture<ListAdquiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAdquiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdquiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
