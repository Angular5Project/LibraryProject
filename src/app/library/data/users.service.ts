import { UserViewModel } from "../login/user.view-model";
import { Injectable } from "@angular/core/";
import { HttpClient } from '@angular/common/http';
//import { HttpClient } from "selenium-webdriver/http";
import { User } from "../model/user";

@Injectable()
export class UsersService {

    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){}

    async checkUserExists(user:UserViewModel): Promise<boolean>{
        let userUrl = this.baseUrl + '/users?userName=' + user.userName + '&password=' + user.password;
        let userFromDB = await this.httpClient.get<User[]>(userUrl).toPromise();
        if (userFromDB.length>0) {
            return true;
        } else {
            return false;
        }
    }

}