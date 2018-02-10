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
  
  constructor(private lendingService:LendingService) { }

  ngOnInit() {
    this.massage="";
  }

  addLend() {
    this.lendingService.insertLoan(this.currentLend).then(result=>{
      debugger;
      if(result){
        switch(result){
          case 0:this.massage="the book was loaned successfully";break;
          case 1:this.massage="This reader doesn't exist in our library";break;
          case 2:this.massage="You can't loan now. You have too many books";break;
        }
      }
    });
  }

}
