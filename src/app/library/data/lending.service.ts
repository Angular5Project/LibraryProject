import { BookCopies } from "../model/book-copies";
import { LendingViewModel } from "../lendings/lending.view-model";
import { ReadersService } from "./readers.service";
import { HttpClient } from "@angular/common/http";
import { Reader } from "../model/reader";
import { Lending } from "../model/lending";
import { promise } from "selenium-webdriver";
import { Injectable } from "@angular/core";
import { LendingDB } from "../../../db/lendingDB";

@Injectable()
export class LendingService {
    //private readerService: ReadersService = new ReadersService();

    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){
        
    }
    
  async  getCountOfBooks(readerID:number) :Promise <number>{// should find how many books the reader has currently
       let lendingUrl = this.baseUrl + '/lending?readerId=' + readerID;
        let lendingsFromDB = await this.httpClient.get<Lending[]>(lendingUrl).toPromise();
        if(lendingsFromDB.length>0){
            let notReturnsYet = lendingsFromDB.filter(s => s.returningDate === null);
            return notReturnsYet.length;
        }
        return 0;
    }

    async  isBookInTheLibrary(bookID:number) :Promise <boolean>{// should find how many books the reader has currently
        let lendingUrl = this.baseUrl + '/lending?bookId=' + bookID;
         let lendingsFromDB = await this.httpClient.get<Lending[]>(lendingUrl).toPromise();
         if(lendingsFromDB.length>0){
             let notReturnsYet = lendingsFromDB.filter(s => s.returningDate === null);
             return notReturnsYet.length==0;
         }
         return true;
     }

    async insertLoan(lend:LendingViewModel):Promise<number>{
        let readerUrl = this.baseUrl + '/reader?id=' + lend.readerId;
        let readerFromDB = await this.httpClient.get<Reader[]>(readerUrl).toPromise();
        if (readerFromDB.length>0) {
            let currentReader: Reader = readerFromDB[0];
         let result = await  this.getCountOfBooks(lend.readerId);
                if(result>=currentReader.maxBooks)
                    return 2;
         let result1 = await this.isBookInTheLibrary(lend.bookId);
                if(!result1)
                    return 3;
            let loan = new Lending(lend.bookId,lend.readerId,new Date(),null);
            await this.httpClient.post(this.baseUrl + '/lending', loan).toPromise();
            return 0;
    } else {
        return 1;
    }
   }

 
  async updateReturn(lenReturnd:LendingViewModel):Promise<boolean>{
        let lendingUrl = this.baseUrl + '/lending?readerId=' + lenReturnd.readerId+ '&bookId='+lenReturnd.bookId;
        let lendingsFromDB = await this.httpClient.get<LendingDB[]>(lendingUrl).toPromise();
        if(lendingsFromDB.length>0){
              await this.httpClient.patch(this.baseUrl + '/lending/'+ lendingsFromDB[0].id.toString(),{"returningDate":new Date()}).toPromise();
              return true;
        }
        else
            return false; 
    }

   serchForLendedBooks(copies: BookCopies[]){
   }
}