import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core'
import { UserViewModel } from './user.view-model';
import { UsersService } from '../data/users.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private userExists:boolean;
  private currentUser: UserViewModel = new UserViewModel();
  private activatedRoute: ActivatedRoute;

  @Output() private userLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private userService:UsersService,private router: Router) { }

  ngOnInit() {
    debugger;
    this.userLoggedIn.emit(false);
  }

  validateUser() {
    this.userExists = false;
    this.userService.checkUserExists(this.currentUser).then(result=>{
      if(result){
        debugger;
        this.router.navigate(['homePage']);

      }else{
        this.userExists = result;
      }

    });
  }
 }
