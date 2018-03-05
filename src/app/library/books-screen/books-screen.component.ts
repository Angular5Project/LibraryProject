import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { BooksService } from '../data/books.service';
import { BooksComponent } from '../books/books.component';
import { BookViewModel } from './book.view-model';
import { Book } from '../model/book';
import { CategoryCodes } from '../model/categories-codes';
import { AudienceCodes } from '../model/audience-codes';

@Component({
  selector: 'books-screen',
  templateUrl: './books-screen.component.html',
  styleUrls: ['./books-screen.component.css']
})
export class BooksScreenComponent implements OnInit {

  private searchForBook: BookViewModel = new BookViewModel();
  private searchResults: BookViewModel[] ;
  private inManageBooksScreen: boolean ;
 
  @Output() private bookSelected: EventEmitter<BookViewModel> = new EventEmitter<BookViewModel>();
  private categories:CategoryCodes[];
  private audience:AudienceCodes[];
  @Input() private fromStatus:boolean;
  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.searchForBook.bookCategory=0;
    this.searchForBook.bookAudience=0;
    this.inManageBooksScreen = true; //TODO: send this parameter from the father
    this.bookService.getAllCtegories().then(result=>{
      if(result.length>0){
        this.categories=result;
      }
    });
    this.bookService.getAllAudiance().then(result=>{
      if(result.length>0){
        this.audience=result;
      }
    });
  }

  addBook(){
    let newBook : BookViewModel = new BookViewModel();
    this.bookSelected.emit(newBook);
  }

  searchBooks(){
    this.bookService.serchBooks(this.searchForBook).then(result=>{
      this.searchResults = result;
    });
  }

  throwOutputAway(selectedbook: BookViewModel){
    this.bookSelected.emit(selectedbook); 
  }



}
