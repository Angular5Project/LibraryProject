export class User{
    constructor(readonly userId:number,readonly password:string, readonly securityLevel:number, 
        readonly userName:string,readonly mail:string, readonly phoneNumber:string ){}
}