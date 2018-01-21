import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksScreenComponent } from './books-screen.component';

describe('BooksScreenComponent', () => {
  let component: BooksScreenComponent;
  let fixture: ComponentFixture<BooksScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
