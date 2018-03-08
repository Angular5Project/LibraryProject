import { Component, OnInit } from '@angular/core';
import { LendingViewModel } from './lending.view-model';
import { LendingService } from '../data/lending.service';

@Component({
  selector: 'lendings',
  templateUrl: './lendings.component.html',
  styleUrls: ['./lendings.component.css']
})
export class LendingsComponent implements OnInit {

  private currentLend : LendingViewModel = new LendingViewModel();
  private massage : String ;
  
  private errorMessage:string="";
  private error:boolean=true;
  private successMessage:string="";
  private success:boolean=true;

  constructor(private lendingService:LendingService) { }

  ngOnInit() {
    this.massage="";
    this.errorMessage = "";
    this.successMessage="";
  }

  addLend() {
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    if(!this.currentLend.readerId){
      this.error=false;
      this.errorMessage = "please enter reader ID";
    }else if(!this.currentLend.bookId){
      this.error=false;
      this.errorMessage = "please enter book ID";
    }else{this.lendingService.insertLoan(this.currentLend).then(result=>{
      debugger;
      if(result){ debugger;
        switch(result){
          case 0:
          //this.massage="the book was loaned successfully";
          this.success=false;
          this.successMessage="the book was loaned successfully";
          break;
          case 1:
          //this.massage="This reader doesn't exist in our library";
          this.error=false;
          this.errorMessage ="This reader doesn't exist in our library";
          break;
          case 2:
          //this.massage="You can't loan now. You have too many books";
          this.error=false;
          this.errorMessage ="You can't loan now. You have too many books";
          break;
          case 3:
          //this.massage="You can't loan now. this book is loaned already";
          this.error=false;
          this.errorMessage ="You can't loan now. this book is loaned already";
          break;
        }
      }
    });
  }
}

}
