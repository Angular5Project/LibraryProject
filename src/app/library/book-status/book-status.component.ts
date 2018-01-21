import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { BooksService } from '../data/books.service';
import { BookViewModel } from '../books-screen/book.view-model';

@Component({
  selector: 'app-book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  //private searchResults: BookComponent[] ;
  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }



}
