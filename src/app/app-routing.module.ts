import { NgModule } from "@angular/core";
import { Route, RouterModule, Router,Routes } from "@angular/router";
import { BookManagmentComponent } from "./library/book-managment/book-managment.component";
import { BookStatusComponent } from "./library/book-status/book-status.component";
import { LoginComponent } from "./library/login/login.component";
import { HomePageComponent } from "./library/home-page/home-page.component";
import { LendingsComponent } from "./library/lendings/lendings.component";
import { ReturningsComponent } from "./library/returnings/returnings.component";


// const routes : Route[] = [
//     //{ path: 'red/:number', component: LoginComponent},
//     { path: 'login', component: LoginComponent},
//     { path: 'homePage', component: HomePageComponent ,
//     children:[
//         { path: 'bookManagment', component: BookManagmentComponent ,outlet:'homeNavigation' },
//         { path: 'bookStatus', component: BookStatusComponent ,outlet:'homeNavigation' },
//         { path: 'lendings', component: LendingsComponent ,outlet:'homeNavigation'},
//         { path: 'returnings', component: ReturningsComponent,outlet:'homeNavigation' }
//     ]},
   
// ];
const route : Route[] = [
     { path: 'login', component: LoginComponent},
     { path: 'homePage', component: HomePageComponent },
     { path: 'homePage/bookManagment', component: BookManagmentComponent ,outlet:'homeNavigation'},
     { path: 'homePage/bookStatus', component: BookStatusComponent ,outlet:'homeNavigation'},
     { path: 'homePage/lendings', component: LendingsComponent },
     { path: 'homePage/returnings', component: ReturningsComponent }  
 ];
const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'homePage', component: HomePageComponent, children: [
        {path: 'bookManagment', component: BookManagmentComponent},
        {path: 'bookStatus', component: BookStatusComponent, outlet:'homeNavigation'},
        {path: 'homePage/lendings', component: LendingsComponent, outlet:'homeNavigation'},
        {path: 'homePage/returnings', component: ReturningsComponent, outlet:'homeNavigation'}
  ]},
];

@NgModule({
    imports:[
        RouterModule.forRoot(routes),
        
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}