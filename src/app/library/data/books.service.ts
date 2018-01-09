import { BookCopies } from "../model/book-copies";

export class BooksService {
    
    


   getCopiesOfBook(bookId:number ): BookCopies[]{
        let copies : BookCopies[] = new Array<BookCopies>();
        return copies;
   }
}