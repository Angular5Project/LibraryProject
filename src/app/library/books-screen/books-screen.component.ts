import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../data/books.service';
import { BooksComponent } from '../books/books.component';
import { BookViewModel } from './book.view-model';
import { Book } from '../model/book';

@Component({
  selector: 'app-books-screen',
  templateUrl: './books-screen.component.html',
  styleUrls: ['./books-screen.component.css']
})
export class BooksScreenComponent implements OnInit {

  private searchForBook: BookViewModel = new BookViewModel();
  private searchResults: BooksComponent ;
 
  @Output() private bookSelected: EventEmitter<Book> = new EventEmitter<Book>();

  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }

  searchBooks(){
    this.searchResults = this.bookService.serchBooks(this.searchForBook);
  }

  throwOutputAway(selectedbook: Book){
    this.bookSelected.emit(selectedbook); 
  }



}
