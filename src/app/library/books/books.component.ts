import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Book } from '../model/book';
import { BookViewModel } from '../book-status/book.view-model';

@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @Input() private books: Book[]

  @Output() private recordSelected: EventEmitter<Book> = new EventEmitter<Book>();

  //private currentBook = new BookViewModel();
  
  constructor() { }

  ngOnInit() {
  }

  addRecord(selectBook:Book) {
   // let selectedBook = new Book(selectBook.bookId,selectBook.bookName,selectBook.author
    //  ,selectBook.publishYear,selectBook.category,selectBook.audience,0);
    this.recordSelected.emit(selectBook);    
  }

}
