import { BookCopies } from "../model/book-copies";
import { LendingViewModel } from "../lendings/lending.view-model";
import { ReadersService } from "./readers.service";

export class LendingService {
    private readerService: ReadersService = new ReadersService();
    
    getCountOfBooks() : number{// should find how many books the reader has currently
        return 5;
    }

    insertLoan(lend:LendingViewModel){//should get also maxBooks of current reader
        let max = this.readerService.getMaxBooksForReader(lend.readerId);
        if(this.getCountOfBooks()>=max)
            throw new Error('You can\'t loan now. You have too many books' );
        //inert to lending, calculating the current date
    }
 
    updateReturn(lereturnnd:LendingViewModel):boolean{
       return true; //check if loan exsits. if yes - update return date and return true;
    }

   serchForLendedBooks( copies: BookCopies[]){
   }
}