import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadarticlesComponent } from './uploadarticles.component';

describe('UploadarticlesComponent', () => {
  let component: UploadarticlesComponent;
  let fixture: ComponentFixture<UploadarticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadarticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadarticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
