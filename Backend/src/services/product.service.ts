import mongoose from "mongoose";
import { IPRODUCT, IUPDATEPRODUCT } from "../interfaces";
import { Product } from "../models";
import { ErrorHandler } from "../handlers/errorHandler";

export class ProductService {
    async getProductsService():Promise<IPRODUCT[]>{
        const products=await Product.find({});
        return products
    }
    async createProductService(productData:IPRODUCT):Promise<IPRODUCT> {
        const product =await Product.create(productData);
        return product
    }
    async getProductByName(productName: string):Promise<IPRODUCT|null> {
        const product=await Product.findOne({productName:productName});
        return product
    }
    async deleteProductService(id:mongoose.Types.ObjectId):Promise<object>{
        const deleteProduct= await Product.findByIdAndDelete(id)
        if(!deleteProduct){
            throw new ErrorHandler(404,'Product not found',false);
        }
        return {message:'Product deleted successfully'};
    }
    async updateProductService(id:mongoose.Types.ObjectId,productData:IUPDATEPRODUCT):Promise<object>{
        const updateProduct=await Product.findByIdAndUpdate(id,productData);
        if(!updateProduct){
            throw new ErrorHandler(404,'Product not found',false)
        }
        return {message:'Product updated successfully'};
    }
}