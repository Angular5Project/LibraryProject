import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Book } from '../model/book';
import { BookViewModel } from '../books-screen/book.view-model';


@Component({
  selector: 'books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @Input() private books: BookViewModel[];

  @Output() private recordSelected: EventEmitter<BookViewModel> = new EventEmitter<BookViewModel>();

  //private currentBook = new BookViewModel();
  
  constructor() { }

  ngOnInit() {
  }

  selectBook(selectBook:BookViewModel) {

    debugger;
   // let selectedBook = new Book(selectBook.bookId,selectBook.bookName,selectBook.author
    //  ,selectBook.publishYear,selectBook.category,selectBook.audience,0);
    this.recordSelected.emit(selectBook);    
  }
}
