import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() private book: Book;

  constructor() { }

  ngOnInit() {
  }

}
