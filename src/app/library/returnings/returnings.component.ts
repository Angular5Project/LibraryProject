import { Component, OnInit } from '@angular/core';
import { LendingViewModel } from '../lendings/lending.view-model';
import { LendingService } from '../data/lending.service';

@Component({
  selector: 'returnings',
  templateUrl: './returnings.component.html',
  styleUrls: ['./returnings.component.css']
})
export class ReturningsComponent implements OnInit {
  private currentReturn:LendingViewModel = new LendingViewModel();
  private loanExists:boolean;
  private massage : String;
  private errorMessage:string="";
  private error:boolean=true;
  private successMessage:string="";
  private success:boolean=true;

  constructor(private lendingService:LendingService) { }

  ngOnInit() {
    this.massage = "";
    this.errorMessage = "";
    this.successMessage="";
  }

  returnBook(){
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    if(!this.currentReturn.readerId){
      this.error=false;
      this.errorMessage = "please enter reader ID";
    }else if(!this.currentReturn.bookId){
      this.error=false;
      this.errorMessage = "please enter book ID";
    }else{
   //this.loanExists = this.lendingService.updateReturn(this.currentReturn);
   this.lendingService.updateReturn(this.currentReturn).then(result=>{
    debugger;
    if(result!=null){
      debugger;
     if(result){
      debugger;
        //this.massage = "the book was retured successfully";
        this.success=false;
        this.successMessage="the book was retured successfully";
      }else{
        //this.massage = "couldn't return the book as expected";
        this.error=false;
        this.errorMessage ="couldn't return the book as expected";
      }
    }
  });
  }
}
}
