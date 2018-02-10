import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../data/books.service';
import { BooksComponent } from '../books/books.component';
import { BookViewModel } from './book.view-model';
import { Book } from '../model/book';

@Component({
  selector: 'books-screen',
  templateUrl: './books-screen.component.html',
  styleUrls: ['./books-screen.component.css']
})
export class BooksScreenComponent implements OnInit {

  private searchForBook: BookViewModel = new BookViewModel();
  private searchResults: Book[] ;
  private inManageBooksScreen: boolean ;
 
  @Output() private bookSelected: EventEmitter<Book> = new EventEmitter<Book>();

  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.inManageBooksScreen = true; //TODO: send this parameter from the father
  }

  addBook(){
    //TODO: rout to the internal manage books screen
  }

  searchBooks(){
    this.bookService.serchBooks(this.searchForBook).then(result=>{
      this.searchResults = result;
    });
  }

  throwOutputAway(selectedbook: Book){
    debugger;
    this.bookSelected.emit(selectedbook); 
  }



}
