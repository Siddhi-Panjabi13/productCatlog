import mongoose from "mongoose"
export interface IUPDATEPRODUCT{
    productName?:string, 
    description?:string, 
    imageURL?:string, 
    price?: number, 
    categoryId?:mongoose.Types.ObjectId
}