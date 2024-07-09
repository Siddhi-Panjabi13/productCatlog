import mongoose from 'mongoose'
export interface ICATEGORY{
    _id?:mongoose.Types.ObjectId,
    categoryName:string
}