import { Component, OnInit } from '@angular/core';
import { UserViewModel } from './user.view-model';
import { UsersService } from '../data/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userExists:boolean;
  private currentUser: UserViewModel = new UserViewModel();

  constructor(private userService:UsersService,private router: Router) { }

  ngOnInit() {
  }

  validateUser() {
    this.userExists = false;
    this.userService.checkUserExists(this.currentUser).then(result=>{
      if(result){
        this.router.navigate(['homePage']);
      }else{
        this.userExists = result;
      }

    });
  }
 }
