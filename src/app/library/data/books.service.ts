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
import { promise } from "selenium-webdriver";
import { Observable } from "rxjs/Observable";


@Injectable()
export class BooksService {
    private categoriesFromDB:CategoryCodes[] = new Array<CategoryCodes>();
    private  audienceFromDB:AudienceCodes[] = new Array<AudienceCodes>();
    
    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){
        this.getAllCtegories();
        this.getAllAudiance();
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

   async serchBooks(searchForBook: BookViewModel): Promise<BookViewModel[]>{
    let booksResult : Book[] = new Array<Book>();
    let vmBooksREsult:BookViewModel[] = new Array<BookViewModel>();
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
        for(let item of booksResult){
            let vmBook:BookViewModel = new BookViewModel();
            vmBook.bookId= item.bookId;
            vmBook.bookName=item.bookName;
            vmBook.bookAuthor=item.author;
            vmBook.bookPublishYear=item.publishYear;
            vmBook.bookCategory=item.categoryCode;
            vmBook.bookCategoryDesc=this.getCategoryDesc(item.categoryCode);
            vmBook.bookAudience=item.audienceCode;
            vmBook.bookAudienceDesc=this.getAudienceDesc(item.audienceCode);
            vmBook.bookLocation=item.location;
            vmBooksREsult.push(vmBook);
        }
        return vmBooksREsult; 
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
 getCategoryDesc(code:number):string{
        let entry =  this.categoriesFromDB.find(s=>s.categoryCode==code);
        return entry.categoryName;
    
 }
 getAudienceDesc(code:number):string{
    let entry =  this.audienceFromDB.find(s=>s.audienceCode==code);
        return entry.audienceName;
 
 }

 async getAllCtegories():Promise<CategoryCodes[]>{
     debugger;
     if(this.categoriesFromDB.length==0){
        let categoriesUrl = this.baseUrl + '/categoryCodes';
        this.categoriesFromDB= await this.httpClient.get<CategoryCodes[]>(categoriesUrl).toPromise();
     }
     return this.categoriesFromDB;
 }

 async getAllAudiance():Promise<AudienceCodes[]>{
     debugger;
     if(this.audienceFromDB.length==0)
     {
        let audienceUrl = this.baseUrl + '/audienceCodes';
        this.audienceFromDB= await this.httpClient.get<AudienceCodes[]>(audienceUrl).toPromise();
     }
    return this.audienceFromDB;
 }


 async addBook (book:BookViewModel):Promise<boolean>{
     debugger;
     let newBook = new Book(book.bookId,book.bookName,book.bookAuthor,book.bookPublishYear,
    book.bookCategory,book.bookAudience,book.bookLocation);
    let booksUrl = this.baseUrl + '/book?bookId='+ book.bookId; 
    let bookFromDB = await this.httpClient.get<Book[]>(booksUrl).toPromise();
    if(bookFromDB.length>0){
        await this.httpClient.delete(booksUrl).toPromise();
        //await this.httpClient.delete(booksUrl+'/'+bookFromDB[0].id).toPromise();
        await this.insertToDB(newBook);
        return true;
    }
    else{
        await this.insertToDB(newBook);
        return true;
    }   
 }

 async deleteBook (bookId:number):Promise<boolean>{
    let booksUrl = this.baseUrl + '/book?bookId='+ bookId; 
    await this.httpClient.delete(booksUrl).toPromise();
    return true;
 }

 async addCopy (bookId:number):Promise<boolean>{
    let copyNo;
    let copiesUrl = this.baseUrl + '/bookCopies?bookId='+bookId;
    let copiesFromDB= await this.httpClient.get<BookCopies[]>(copiesUrl).toPromise();
    if(copiesFromDB.length>0){
        copyNo = +(copiesFromDB[length-1].copyId);
        copyNo++;
    }else{
        copyNo = bookId+"000";
    }

    let newCopy = new BookCopies(bookId,copyNo);
     return true;
 }

 async insertToDB(book:Book){
     await this.httpClient.post(this.baseUrl +'/book', book).toPromise();
 }
}