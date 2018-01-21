import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { LendingsComponent } from './lendings/lendings.component';
import { ReturningsComponent } from './returnings/returnings.component';
import { BookStatusComponent } from './book-status/book-status.component';
import { BookComponent } from './book/book.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [LoginComponent, LendingsComponent, ReturningsComponent,BookStatusComponent, BookComponent],
  exports:[LoginComponent, LendingsComponent, ReturningsComponent,BookStatusComponent]
})
export class LibraryModule { }