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

  constructor(private lendingService:LendingService) { }

  ngOnInit() {
    this.massage = "";
  }

  returnBook(){
   //this.loanExists = this.lendingService.updateReturn(this.currentReturn);
   this.lendingService.updateReturn(this.currentReturn).then(result=>{
     debugger;
    if(result!= null){
      debugger;
      switch(result){
        case true:
          this.massage = "the book was retured successfully";
          break;
        case !true:
          this.massage = "This book was't lended";
          break;
      }
    }
  });
  }

}
