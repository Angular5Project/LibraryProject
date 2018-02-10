import { Component, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { BooksService } from '../data/books.service';
import { BookViewModel } from '../books-screen/book.view-model';
import { Book } from '../model/book';

@Component({
  selector: 'book-status',
  templateUrl: './book-status.component.html',
  styleUrls: ['./book-status.component.css']
})
export class BookStatusComponent implements OnInit {

  //private searchResults: BookComponent[] ;
  private massage : string;
  
  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.massage="";
  }

  getSelectedBookEvent(selectedBook:Book){
    debugger;
    this.bookService.getStatusOfBook(selectedBook).then(result=>{
      if(result){
        this.massage="there is such a book in the library, you can find it on shelf no."+selectedBook.location;
      }else{
        this.massage="sorry, there is no copy of this book in the library"
      }
      
    });
    
  }



}
