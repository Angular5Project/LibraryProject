import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';

@Component({
  selector: 'book-managment',
  templateUrl: './book-managment.component.html',
  styleUrls: ['./book-managment.component.css']
})
export class BookManagmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getSelectedBookEvent(selectedBook:Book){
    debugger;
    //TODO: rout to the internal book-managment screen with the currentBook details
    
  }

}
