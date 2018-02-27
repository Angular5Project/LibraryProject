export class LendingDB{
    constructor(readonly id: number,readonly bookId:number, readonly readerId:number,readonly lendingDate:Date,
         readonly returningDate:Date
      ){}
    }