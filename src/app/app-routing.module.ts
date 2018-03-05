import { NgModule } from "@angular/core";
import { Route, RouterModule, Router,Routes } from "@angular/router";
import { BookManagmentComponent } from "./library/book-managment/book-managment.component";
import { BookStatusComponent } from "./library/book-status/book-status.component";
import { LoginComponent } from "./library/login/login.component";
import { HomePageComponent } from "./library/home-page/home-page.component";
import { LendingsComponent } from "./library/lendings/lendings.component";
import { ReturningsComponent } from "./library/returnings/returnings.component";
import { RedearsManagmentComponent } from "./library/redears-managment/redears-managment.component";
import { InternalBookMangmentComponent } from "./library/internal-book-mangment/internal-book-mangment.component";

 const routes: Routes = [
     {path: '', redirectTo: 'login', pathMatch: 'full'},
     {path: 'login', component: LoginComponent},
     {path: 'homePage', component: HomePageComponent, children: [
         {path: 'bookManagment', component: BookManagmentComponent},
         {path: 'internalBookManagment/:id', component: InternalBookMangmentComponent},
         {path: 'bookStatus', component: BookStatusComponent},
         {path: 'lendings', component: LendingsComponent},
         {path: 'returnings', component: ReturningsComponent},
         {path: 'readersManagment', component: RedearsManagmentComponent}
         
   ]},
 ];

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
        
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}