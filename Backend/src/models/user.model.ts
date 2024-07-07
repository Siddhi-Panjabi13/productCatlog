import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt';
import { Role } from "../enums/enums";
const userSchema= new Schema(
    {
        userName:{
            type:String,
            required:true,
            unique:true
        },
       
        password:{
            type:String,
            required:true
        },
       role:{
        type:String,
        required:true,
        enum:Object.values(Role),
        default:Role.USER
       }
    },
    
    {
        timestamps:true
    })
    userSchema.pre("save",async function(next){
        if(!this.isModified("password"))return next();
        const salt=10
        this.password=await bcrypt.hash(this.password,salt)
        next();
    })
    const User=mongoose.model('User',userSchema);
    export {User}