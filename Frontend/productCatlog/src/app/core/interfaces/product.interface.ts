import mongoose from 'mongoose'
export interface IPRODUCT{
    productName:string, 
    description:string, 
    imageURL:string, 
    price: number, 
    categoryId:mongoose.Types.ObjectId
}