import { Component, OnInit } from '@angular/core';
import { BooksService } from '../data/books.service';
import { CategoryCodes } from '../model/categories-codes';
import { AudienceCodes } from '../model/audience-codes';
import { BookViewModel } from '../books-screen/book.view-model';
import {Router, ActivatedRoute } from '@angular/router';




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

  constructor(private bookService: BooksService,private route: ActivatedRoute,private router:Router) { }

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
    this.route.paramMap.subscribe(params=> {
      let id = +params.get('id');
      if(id!=0){
      this.bookService.getBookById(id).then(result=>{
          this.currentBook.bookId= result.bookId;
          this.currentBook.bookName=result.bookName;
          this.currentBook.bookAuthor=result.author;
          this.currentBook.bookPublishYear=result.publishYear;
          this.currentBook.bookCategory=result.categoryCode;
          this.currentBook.bookAudience=result.audienceCode;
          this.currentBook.bookLocation=result.location;
        }); 
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
    this.router.navigate(['homePage/bookManagment']);
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
