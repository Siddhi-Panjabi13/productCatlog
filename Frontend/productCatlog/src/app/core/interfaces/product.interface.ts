import mongoose from 'mongoose'
export interface IPRODUCT{
    _id?:mongoose.Types.ObjectId,
    productName:string, 
    description:string, 
    imageURL:string, 
    price: number, 
    categoryId:mongoose.Types.ObjectId
}