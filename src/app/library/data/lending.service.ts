import { BookCopies } from "../model/book-copies";
import { LendingViewModel } from "../lendings/lending.view-model";
import { ReadersService } from "./readers.service";
import { HttpClient } from "@angular/common/http";
import { Reader } from "../model/reader";
import { Lending } from "../model/lending";
import { promise } from "selenium-webdriver";
import { Injectable } from "@angular/core";

@Injectable()
export class LendingService {
    private readerService: ReadersService = new ReadersService();

    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){
        
    }
    
  async  getCountOfBooks(readerID:number) :Promise <number>{// should find how many books the reader has currently
        debugger;
        let lendingUrl = this.baseUrl + '/lending?readerId=' + readerID;
        let lendingsFromDB = await this.httpClient.get<Lending[]>(lendingUrl).toPromise();
        if(lendingsFromDB.length>0){
            let notReturnsYet = lendingsFromDB.filter(s => s.returningDate === null);
            return notReturnsYet.length;
        }
        return 0;
    }

    async insertLoan(lend:LendingViewModel):Promise<number>{//should get also maxBooks of current reader  maxBooks
        debugger;
        let readerUrl = this.baseUrl + '/reader?readerId=' + lend.readerId;
        let readerFromDB = await this.httpClient.get<Reader[]>(readerUrl).toPromise();
        if (readerFromDB.length>0) {
            let currentReader: Reader = readerFromDB[0];
            this.getCountOfBooks(lend.readerId).then(result=>{
                debugger;
                if(result>=currentReader.maxBooks){
                    return 2;
                }
                else{
                let loan = new Lending(lend.bookId,lend.readerId,new Date(),null);
                this.httpClient.post(this.baseUrl + '/lending', loan).toPromise();
                return 0;
                }    
            });
        } else {
            return 1;
        }
   }
 
  async updateReturn(lenReturnd:LendingViewModel):Promise<boolean>{
      debugger;
        let lendingUrl = this.baseUrl + '/lending?readerId=' + lenReturnd.readerId+ '&bookId='+lenReturnd.bookId;
        let lendingsFromDB = await this.httpClient.get<Lending[]>(lendingUrl).toPromise();
        if(lendingsFromDB.length>0){
            let loan = new Lending(lendingsFromDB[0].bookId,lendingsFromDB[0].readerId,lendingsFromDB[0].lendingDate,new Date());
              this.httpClient.post(this.baseUrl + '/lending',loan).subscribe(result=>{//??????
                  debugger;
              });
            return true;
        }
        else
            return false; 
    }

   serchForLendedBooks(copies: BookCopies[]){
   }
}