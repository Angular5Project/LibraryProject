import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { Router, ActivatedRoute } from '@angular/router';
import { BookViewModel } from '../books-screen/book.view-model';

@Component({
  selector: 'book-managment',
  templateUrl: './book-managment.component.html',
  styleUrls: ['./book-managment.component.css']
})
export class BookManagmentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  getSelectedBookEvent(selectedBook:BookViewModel){
    debugger;
    let ID:number = selectedBook.bookId;
    if(!ID){
      ID = 0
    }
    this.router.navigate(['homePage/internalBookManagment',ID]);
    
  }

}
