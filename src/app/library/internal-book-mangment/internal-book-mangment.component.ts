import { Component, OnInit } from '@angular/core';
import { BooksService } from '../data/books.service';
import { CategoryCodes } from '../model/categories-codes';
import { AudienceCodes } from '../model/audience-codes';
import { BookViewModel } from '../books-screen/book.view-model';

@Component({
  selector: 'internal-book-mangment',
  templateUrl: './internal-book-mangment.component.html',
  styleUrls: ['./internal-book-mangment.component.css']
})
export class InternalBookMangmentComponent implements OnInit {
  
  private currentBook: BookViewModel = new BookViewModel();
  private categories:CategoryCodes[];
  private audience:AudienceCodes[];
  private errorMessage:string="";

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.errorMessage = "";
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
  Save(){
    this.errorMessage = "";
    this.errorMessage = this.checkAllFieldsAreFill(this.currentBook);
    if(this.errorMessage==""){
     // this.bookService.
    }
  }
  DeleteBookFromLibrary(){
    this.errorMessage = "";
    if(!this.currentBook.bookId){
      this.errorMessage = "please enter book ID";
    }else{
      //this.bookService...
    }
    
  }
  addCopyOfBook(){
    this.errorMessage = "";
    if(!this.currentBook.bookId){
      this.errorMessage = "please enter book ID";
    }else{
      //this.bookService...
    }
  }
  cancel(){
    //TODO: route to the previous screen
  }
  checkAllFieldsAreFill(book: BookViewModel): string {
    if(!book.bookId)
      return "please enter book ID";
    if(!book.bookName || book.bookName==' ')
      return "please enter book name";
    if(!book.bookAuthor || book.bookAuthor==' ')
      return "please enter book author";
    if(!book.bookAudience)
      return "please enter book audience";
    if(!book.bookCategory)
      return "please enter book category";
    if(!book.bookPublishYear)
      return "please enter book publish year";
    if(!book.bookLocation)
      return "please enter book location";
    return"";
  }
}
