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
  private error:boolean=true;
  private successMessage:string="";
  private success:boolean=true;

  constructor(private bookService: BooksService) { }

  ngOnInit() {
    this.errorMessage = "";
    this.successMessage="";
    this.currentBook.bookCategory=0;
    this.currentBook.bookAudience=0;
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
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    this.errorMessage = this.checkAllFieldsAreFill(this.currentBook);
    if(this.errorMessage==""){
      this.bookService.addBook(this.currentBook).then(result=>{
        this.success=false;
        this.successMessage="You'r book was added successfully!";
      });
    }
    else{
      this.error=false;
    }
  }
  DeleteBookFromLibrary(){
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    if(!this.currentBook.bookId){
      this.error=false;
      this.errorMessage = "please enter book ID";
    }else{
      this.bookService.deleteBook(this.currentBook.bookId).then(result=>{
        if(result==true){
        this.success=false;
        this.successMessage="You'r book was deleted successfully!";
        }
        else{
          this.error=false;
          this.errorMessage = "Failed to delete the book";
        }
      });
    }  
  }
  addCopyOfBook(){
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    if(!this.currentBook.bookId){
      this.error=false;
      this.errorMessage = "please enter book ID";
    }else{
      this.bookService.addCopy(this.currentBook.bookId).then(result=>{
        if(result==true){
        this.success=false;
        this.successMessage="You'r copy was added successfully!"
        }else{
          this.error=false;
          this.errorMessage = "Failed to add a copy for this book";
        }
      });
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
    if(!book.bookCategory ||book.bookCategory.toString()=="0")
      return "please enter book category";
    if(!book.bookAudience || book.bookAudience.toString()=='0')
      return "please enter book audience";
    if(!book.bookPublishYear)
      return "please enter book publish year";
    if(!book.bookLocation)
      return "please enter book location";
    return"";
  }
}
