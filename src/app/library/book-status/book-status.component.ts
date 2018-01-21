import { Component, OnInit } from '@angular/core';
import { BookViewModel } from './book.view-model';
import { BookComponent } from '../book/book.component';
import { BooksService } from '../data/books.service';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  private searchForBook: BookViewModel = new BookViewModel();
  private searchResults: BookComponent[] ;
  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }

  searchBooks(){
    this.searchResults = this.bookService.serchBooks(searchForBook);

  }

}
