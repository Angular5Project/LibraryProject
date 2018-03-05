import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ReaderViewModel } from "../redears-managment/reader.view-model";
import { Reader } from "../model/reader";


@Injectable()
export class ReadersService {

    baseUrl: string = 'http://localhost:3000';

    constructor(private httpClient:HttpClient){}

    async addReader(reader:ReaderViewModel):Promise<boolean>{
       let newReader = new Reader(reader.readerId,reader.readerName,reader.mail,reader.phoneNumber,reader.maxBooks);
        let readerUrl = this.baseUrl + '/reader?id='+ reader.readerId; 
        let readerFromDB = await this.httpClient.get<Reader[]>(readerUrl).toPromise();
        if(readerFromDB.length>0){
            await this.httpClient.delete(this.baseUrl+'/reader/'+readerFromDB[0].id).toPromise();
            await this.insertToDB(newReader);
            return true;
        }
         else{
            await this.insertToDB(newReader);
            return true;
        }
    }
    async getReader(readerId:number):Promise<ReaderViewModel>{
        let currentReader: ReaderViewModel= new ReaderViewModel();
        let readerUrl = this.baseUrl + '/reader?id='+ readerId; 
        let readerFromDB = await this.httpClient.get<Reader[]>(readerUrl).toPromise();
        if(readerFromDB.length>0){
            currentReader.readerId = readerFromDB[0].id;
            currentReader.readerName = readerFromDB[0].readerName;
            currentReader.mail = readerFromDB[0].mail;
            currentReader.phoneNumber = readerFromDB[0].phoneNumber;
            currentReader.maxBooks = readerFromDB[0].maxBooks;
        }
        return currentReader;

    }

    async deleteReader(readerId:number):Promise<boolean>{
        let readerUrl = this.baseUrl + '/reader?id='+ readerId; 
        let readerFromDB = await this.httpClient.get<Reader[]>(readerUrl).toPromise();
        if(readerFromDB.length>0){
        await this.httpClient.delete(this.baseUrl+'/reader/'+readerFromDB[0].id).toPromise();
        return true;
        }
        return false;
    }

    async insertToDB(reader:Reader){
        await this.httpClient.post(this.baseUrl +'/reader', reader).toPromise();
    }

}
