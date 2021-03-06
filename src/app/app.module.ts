import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UsersService } from './library/data/users.service';
import { LibraryModule } from './library/library.module';
import { LendingService } from './library/data/lending.service';
import { BooksService } from './library/data/books.service';
import { ReadersService } from './library/data/readers.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LibraryModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UsersService, LendingService, BooksService, ReadersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
