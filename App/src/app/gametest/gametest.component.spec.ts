import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GametestComponent } from './gametest.component';

describe('GametestComponent', () => {
  let component: GametestComponent;
  let fixture: ComponentFixture<GametestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GametestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GametestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
