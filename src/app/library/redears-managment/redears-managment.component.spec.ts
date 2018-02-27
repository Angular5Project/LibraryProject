import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedearsManagmentComponent } from './redears-managment.component';

describe('RedearsManagmentComponent', () => {
  let component: RedearsManagmentComponent;
  let fixture: ComponentFixture<RedearsManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedearsManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedearsManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
