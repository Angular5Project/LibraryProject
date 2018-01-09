import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturningsComponent } from './returnings.component';

describe('ReturningsComponent', () => {
  let component: ReturningsComponent;
  let fixture: ComponentFixture<ReturningsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturningsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
