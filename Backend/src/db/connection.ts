import mongoose  from "mongoose";
import { URL } from "../config/appconfig";

export const dbConnection =async()=>{
    try{
        await mongoose.connect(URL.uri)
        console.log("Database Connected")
    }catch(err){
        console.log(err)
    }
}