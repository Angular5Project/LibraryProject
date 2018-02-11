import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LendingsComponent } from './lendings/lendings.component';
import { ReturningsComponent } from './returnings/returnings.component';
import { BookStatusComponent } from './book-status/book-status.component';
import { BookComponent } from './book/book.component';
import { BooksScreenComponent } from './books-screen/books-screen.component';
import { BooksComponent } from './books/books.component';
import { BookManagmentComponent } from './book-managment/book-managment.component';
import { InternalBookMangmentComponent } from './internal-book-mangment/internal-book-mangment.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent, LendingsComponent, ReturningsComponent,BookStatusComponent, 
    BookComponent,BooksComponent, BooksScreenComponent,
    BookManagmentComponent,BookManagmentComponent,InternalBookMangmentComponent],
  exports:[LoginComponent, LendingsComponent, ReturningsComponent,BookStatusComponent,
    BookManagmentComponent]
})


export class LibraryModule { }