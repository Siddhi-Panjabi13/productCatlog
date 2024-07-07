import { User } from "../models";
import { IUSER, IUPDATEUSER } from "../interfaces";
import {ErrorHandler} from '../handlers/errorHandler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {Secret_key} from '../config/appconfig';


export class UserService{
    async createUserService(userData:IUSER):Promise<IUSER>{
        const user:IUSER= await User.create(userData)
        return user
    }
    async loginUserService(userName:string,password:string){
        const verifyUser=await User.findOne({userName:userName});
        if(!verifyUser){
            throw new ErrorHandler(404,'User not found',false)
        }
        const matchPassword=await bcrypt.compare(password,verifyUser.password)
        if(!matchPassword){
            throw new ErrorHandler(401,'Invalid Password',false);
        }

        const uid=verifyUser._id;
        const role=verifyUser.role;
       
            const payload={uid}
        const token=jwt.sign(payload,Secret_key.secret_key,{expiresIn:1200});
        return {
            token,
            userName,
            role
        }
    }
    async updateUserService(id:string,updateData:IUPDATEUSER,user:IUSER):Promise<IUSER> {
        if(user._id?.toString()===id.toString()){
            if(updateData.password){
                const salt=10
                updateData.password=await bcrypt.hash(updateData.password,salt)
                console.log(updateData.password);
            }
            const updateUser=await User.findByIdAndUpdate(id,updateData,{new:true});
            if(!updateUser){
                throw new ErrorHandler(404,'User not found',false)
            }
            else{
                return updateUser
            }
        }
        else{
            throw new ErrorHandler(403,'You cannot update other users',false)
        }
        
    }
    async deleteUserService(id:string,user:IUSER):Promise<object>{
        if((user._id?.toString()===id.toString())){
            const deleteUser=await User.findByIdAndDelete(id);
            if(!deleteUser){
                throw new ErrorHandler(404,'User not found',false)
            }
            else{
                return {"message":"User deleted successfully"}
            }
        }
        else{
            throw new ErrorHandler(403,'You cannot delete other users',false)
        }
        
    }

    async getAllUsersService(){
        const users=await User.find({role:'User'});
        return users;
    }
    async getUserById(id:any):Promise<IUSER|null>{
        const user=await User.findById(id);
        return user
      }
}