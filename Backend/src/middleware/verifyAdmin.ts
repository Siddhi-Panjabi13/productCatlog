import {Request,Response,NextFunction} from "express";
import { IUSER,IREQUEST } from "../interfaces";
import { ErrorHandler } from "../handlers/errorHandler";

export const verifyRole = (requiredRoles:string[]) => {
  return (req:Request, res:Response, next:NextFunction) => {
    const user=(req as IREQUEST).user
    const userRole=user.role;
    const isAuthorized= requiredRoles.some(role => role===userRole);
    if(!isAuthorized){
        throw new ErrorHandler(403,'Forbidden Access',false)
    }
    else{
        next();
    }
  }
};


