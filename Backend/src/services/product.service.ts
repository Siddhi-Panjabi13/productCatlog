import mongoose from "mongoose";
import { IPRODUCT, IUPDATEPRODUCT } from "../interfaces";
import { Product } from "../models";
import { ErrorHandler } from "../handlers/errorHandler";
import fs from 'fs'
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
        
        if(productData.imageURL){
            const product=await this.getProductByIdService(id)
            fs.unlink(product.imageURL, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                    
                } else {
                    console.log('Image deleted successfully');
                }
            });
        }
          const updateProduct=await Product.findByIdAndUpdate(id,productData);
        if(!updateProduct){
            throw new ErrorHandler(404,'Product not found',false)
        }
        return {message:'Product updated successfully'};
    }
    async getProductByIdService(id:mongoose.Types.ObjectId):Promise<IPRODUCT>{
        const product=await Product.findOne({_id:id});
        if(!product){
            throw new ErrorHandler(404,'Product not found',false);
        }
        else{
            return product
        }
    }
}