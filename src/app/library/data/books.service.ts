import { BookCopies } from "../model/book-copies";
import { BookViewModel } from "../book-status/book.view-model";
import { BookComponent } from "../book/book.component";

export class BooksService {
    
    


   getCopiesOfBook(bookId:number ): BookCopies[]{
        let copies : BookCopies[] = new Array<BookCopies>();
        return copies;
   }

   serchBooks(searchForBook: BookViewModel): BookComponent[]{
    let booksResult : BookComponent[] = new Array<BookComponent>();
    return booksResult;
   }
}