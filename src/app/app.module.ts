import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { UsersService } from './library/data/users.service';
import { LibraryModule } from './library/library.module';
import { LendingService } from './library/data/lending.service';
import { BooksService } from './library/data/books.service';
import { ReadersService } from './library/data/readers.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LibraryModule
  ],
  providers: [UsersService, LendingService, BooksService, ReadersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
