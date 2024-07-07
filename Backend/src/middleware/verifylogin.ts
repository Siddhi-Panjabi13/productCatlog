import {User} from '../models'
import { Request,Response,NextFunction } from 'express'
import { ErrorHandler } from '../handlers/errorHandler';
import jwt from 'jsonwebtoken'
import { Secret_key } from '../config/appconfig';
import { IREQUEST } from '../interfaces';

export const verifyLogin=async(req:Request,res:Response,next:NextFunction)=>{
    const token= req.headers.authorization?.split(' ')[1];
    if(!token){
        const error=new ErrorHandler(401,"Token not found",false)
        res.status(error.statusCode).json( error.message);
        return
    }
    jwt.verify(token,Secret_key.secret_key,async(err:any,decoded:any)=>{
        if(err){
            const error=new ErrorHandler(401,err.message,false)
            res.status(error.statusCode).json(error.message);
            return
        }
        else{
            const user=await User.findOne({_id:decoded.uid})
            if(!user){
                const error=new ErrorHandler(404,"User not found",false)
                res.status(error.statusCode).json(error.message);
                return
            }
            else{

                (req as IREQUEST).user=user;
                next();
            }
           
        }
    })
    
}