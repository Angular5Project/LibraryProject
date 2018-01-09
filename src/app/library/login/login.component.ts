import { Component, OnInit } from '@angular/core';
import { UserViewModel } from './user.view-model';
import { UsersService } from '../data/users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userExists:boolean;
  private currentUser: UserViewModel = new UserViewModel();

  constructor(private userService:UsersService) { }

  ngOnInit() {
  }

  validateUser() {
    this.userExists =  this.userService.checkUserExists(this.currentUser);
  }

}
