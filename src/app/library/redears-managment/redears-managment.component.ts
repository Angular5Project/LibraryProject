import { Component, OnInit } from '@angular/core';
import { ReaderViewModel } from './reader.view-model';
import { ReadersService } from '../data/readers.service';

@Component({
  selector: 'redears-managment',
  templateUrl: './redears-managment.component.html',
  styleUrls: ['./redears-managment.component.css']
})
export class RedearsManagmentComponent implements OnInit {

  private currentReader: ReaderViewModel = new ReaderViewModel();
  private errorMessage:string="";
  private error:boolean=true;
  private successMessage:string="";
  private success:boolean=true;

  constructor(private readerService:ReadersService) { }

  ngOnInit() {
    this.errorMessage = "";
    this.successMessage="";
  }

  Save(){
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    this.errorMessage = this.checkAllFieldsAreFill();
    if(this.errorMessage==""){
      this.readerService.addReader(this.currentReader).then(result=>{
        this.success=false;
        this.successMessage="The reader was added successfully!";
      });
    }
    else{
      this.error=false;
    }
  }

  getDetailsById(){
    this.error=true;
      this.success=true;
      this.errorMessage = "";
      this.successMessage="";
      if(!this.currentReader.readerId){
        this.error=false;
        this.errorMessage = "please enter reader ID";
      }else{
        this.readerService.getReader(this.currentReader.readerId).then(result=>{
          if(result.readerId){
          this.currentReader=result;
          }else{
            this.error=false;
            this.errorMessage = "there is no reader with this ID";
          }
        });
      }
    
  }

  Delete(){
    this.error=true;
    this.success=true;
    this.errorMessage = "";
    this.successMessage="";
    if(!this.currentReader.readerId){
      this.error=false;
      this.errorMessage = "please enter reader ID";
    }else{
      this.readerService.deleteReader(this.currentReader.readerId).then(result=>{
        if(result==true){
        this.success=false;
        this.successMessage="The reader was deleted successfully!";
        }
        else{
          this.error=false;
          this.errorMessage = "Failed to delete the reader";
        }
      });
    }  
  }
  checkAllFieldsAreFill(): string {
    if(!this.currentReader.readerId)
      return "please enter reader ID";
    if(!this.currentReader.readerName)  
      return "please enter reader name";
      if(!this.currentReader.mail)
      return "please enter reader mail";
    if(!this.currentReader.phoneNumber)  
      return "please enter reader phone number";
    if(!this.currentReader.maxBooks)
      this.currentReader.maxBooks=1;

    return "";
  }
}
