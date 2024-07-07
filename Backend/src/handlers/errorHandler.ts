export class ErrorHandler extends Error{
     statusCode
     status
    constructor(statusCode:number,message:string,status:boolean){
        super(message);
        this.statusCode=statusCode;
        this.message=message;
        this.status=status
    }
}