import mongoose,{Schema} from "mongoose"
import { ICATEGORY } from "../interfaces/category.interface"

const CategorySchema:Schema<ICATEGORY>= new mongoose.Schema({
    categoryName:{
        type:String,
        trim:true,
        unique:true,
        required:true
    }
},{
    timestamps:true
})



const Category= mongoose.model("Category",CategorySchema)

export {Category};