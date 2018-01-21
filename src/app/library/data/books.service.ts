import { BookCopies } from "../model/book-copies";
import { BookComponent } from "../book/book.component";
import { BookViewModel } from "../books-screen/book.view-model";
import { BooksComponent } from "../books/books.component";

export class BooksService {
    
    


   getCopiesOfBook(bookId:number ): BookCopies[]{
        let copies : BookCopies[] = new Array<BookCopies>();
        return copies;
   }

   serchBooks(searchForBook: BookViewModel): BooksComponent{
    let booksResult : BooksComponent = new BooksComponent();
    return booksResult;
   }
}