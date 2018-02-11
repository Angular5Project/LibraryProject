import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalBookMangmentComponent } from './internal-book-mangment.component';

describe('InternalBookMangmentComponent', () => {
  let component: InternalBookMangmentComponent;
  let fixture: ComponentFixture<InternalBookMangmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalBookMangmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalBookMangmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
