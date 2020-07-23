import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdificiosListComponent } from './edificios-list.component';

describe('EdificiosListComponent', () => {
  let component: EdificiosListComponent;
  let fixture: ComponentFixture<EdificiosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdificiosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdificiosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
