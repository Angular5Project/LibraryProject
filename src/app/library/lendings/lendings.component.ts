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
  
  constructor(private lendingService:LendingService) { }

  ngOnInit() {
  }

  addLend() {
    this.lendingService.insertLoan(this.currentLend);
  }

}
