import mongoose,{Schema} from "mongoose"
import { IPRODUCT } from "../interfaces"
const ProductSchema:Schema<IPRODUCT> = new mongoose.Schema({
    productName:
    {
        type:String,
        required:true,
        unique:true
    }, 
    description:{
        type:String,
        required:true
    }, 
    imageURL:{

        type:String, 
        required:true
    },

    price: {
        type:Number,
        required:true
    }, 
    categoryId:
    {
    type:mongoose.Schema.Types.ObjectId,
    ref:'Category',
    required:true
}
   
},{
    timestamps:true
})

const Product = mongoose.model('Products',ProductSchema)


export {Product}