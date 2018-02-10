export class Lending{
    constructor(readonly bookId:number, readonly readerId:number,readonly lendingDate:Date,
         readonly returningDate:Date
      ){}
     /* constructor(readonly bookId:number, readonly readerId:number,readonly lendingDate:string,
        readonly returningDate:string
     ){}*/
}