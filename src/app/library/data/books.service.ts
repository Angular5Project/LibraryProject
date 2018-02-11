import { BookCopies } from "../model/book-copies";
import { BookComponent } from "../book/book.component";
import { BookViewModel } from "../books-screen/book.view-model";
import { BooksComponent } from "../books/books.component";
import { HttpClient } from "@angular/common/http";
import { Book } from "../model/book";
import { Injectable } from "@angular/core";
import { Lending } from "../model/lending";
import { CategoryCodes } from "../model/categories-codes";
import { AudienceCodes } from "../model/audience-codes";
import { Promise } from "q";

@Injectable()
export class BooksService {
    
    
    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){

    }

   async getCopiesOfBook(bookId:number ): Promise<BookCopies[]>{
    let copies : BookCopies[] = new Array<BookCopies>();
    let booksUrl = this.baseUrl + '/bookCopies?bookId='+bookId;
    let result = await this.httpClient.get<BookCopies[]>(booksUrl).toPromise();
    if(result.length>0){
        copies=result;
    }
    return copies;
   }

   async serchBooks(searchForBook: BookViewModel): Promise<Book[]>{
    let booksResult : Book[] = new Array<Book>();
        let booksUrl = this.baseUrl + '/book';
        let result = await this.httpClient.get<Book[]>(booksUrl).toPromise();
            if(result.length>0){
                booksResult = result;
                if(searchForBook.bookName != null && searchForBook.bookName != ' '){
                    booksResult = booksResult.filter(s=>s.bookName == searchForBook.bookName)
                }
                if(searchForBook.bookAuthor != null && searchForBook.bookAuthor != ' '){
                    booksResult = booksResult.filter(s=>s.author == searchForBook.bookAuthor)
                }
                if(searchForBook.bookAudience != null && searchForBook.bookAudience != 0){
                    booksResult = booksResult.filter(s=>s.audienceCode == searchForBook.bookAudience)
                }
                if(searchForBook.bookCategory != null && searchForBook.bookCategory !=0){
                    booksResult = booksResult.filter(s=>s.categoryCode == searchForBook.bookCategory)
                }
                if(searchForBook.bookLocation != null && searchForBook.bookLocation != 0){
                    booksResult = booksResult.filter(s=>s.location == searchForBook.bookLocation)
                }
                if(searchForBook.bookPublishYear != null && searchForBook.bookPublishYear != 0){
                    booksResult = booksResult.filter(s=>s.publishYear == searchForBook.bookPublishYear)
                }
            }
        return booksResult; 
   }

   async getStatusOfBook(selectedBook:Book):Promise<boolean>{
    debugger;
    let booksUrl = this.baseUrl + '/bookCopies?bookId='+selectedBook.bookId;
    let result = await this.httpClient.get<BookCopies[]>(booksUrl).toPromise();
    if(result.length>0){
        for (var book of result){
            let lendingUrl = this.baseUrl + '/lending?bookId=' + book.copyId;
            let lendingsFromDB =await this.httpClient.get<Lending[]>(lendingUrl).toPromise();
            if(lendingsFromDB.length==0){
                return true;
            }
            if(lendingsFromDB.length>0){
                let notReturnsYet = lendingsFromDB.filter(s => s.returningDate === null);
                if (notReturnsYet.length==0){
                    return true;
                }
            }
        } 
    }
    return false;
 }

 async getAllCtegories():Promise<CategoryCodes[]>{
     debugger;
    let categoriesUrl = this.baseUrl + '/categoryCodes';
    let categoriesFromDB= await this.httpClient.get<CategoryCodes[]>(categoriesUrl).toPromise();
    return categoriesFromDB;
 }

 async getAllAudiance():Promise<AudienceCodes[]>{
     debugger;
    let audienceUrl = this.baseUrl + '/audienceCodes';
    let audienceFromDB= await this.httpClient.get<AudienceCodes[]>(audienceUrl).toPromise();
    return audienceFromDB;
 }

 async addBook ():Promise<>
 {
    let booksUrl = this.baseUrl + '/book';
    
    let result = await this.httpClient.get<Book[]>(booksUrl).toPromise();
 }
}