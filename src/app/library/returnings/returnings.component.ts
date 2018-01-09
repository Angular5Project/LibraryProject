import { Component, OnInit } from '@angular/core';
import { LendingViewModel } from '../lendings/lending.view-model';
import { LendingService } from '../data/lendind.service';

@Component({
  selector: 'app-returnings',
  templateUrl: './returnings.component.html',
  styleUrls: ['./returnings.component.css']
})
export class ReturningsComponent implements OnInit {

  private currentReturn:LendingViewModel = new LendingViewModel();

  constructor(private lendingService:LendingService) { }

  ngOnInit() {
  }

  returnBook(){
    this.lendingService.updateReturn(this.currentReturn);
  }

}
