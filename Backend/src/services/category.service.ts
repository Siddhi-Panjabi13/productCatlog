import { Category } from "../models";
import { ICATEGORY } from "../interfaces";
import mongoose from "mongoose";
import { ErrorHandler } from "../handlers/errorHandler";
export class CategoryService{
    async getAllCategories():Promise<ICATEGORY[]>{
        const categories=await Category.find({});
        return categories;
    }
    async findCategoryByNameService(categoryName:string):Promise<ICATEGORY|null>{
        const category:ICATEGORY|null=await Category.findOne({categoryName:categoryName})
        return category
    }
    async createCategoryService(categoryData:ICATEGORY):Promise<ICATEGORY>{
        const category:ICATEGORY=await Category.create(categoryData);
        return category
    }
    async deleteCategoryService(id:mongoose.Types.ObjectId):Promise<object>{
        const deleteCategory=await Category.findByIdAndDelete(id);
        if(!deleteCategory){
            throw new ErrorHandler(404,'Category not found...',false);
        }
        return({message:'Category deleted successfully'})
    }
    async updateCategoryService(id:mongoose.Types.ObjectId,updateData:any):Promise<object>{
        const updateCategory=await Category.findByIdAndUpdate(id,updateData);
        if(!updateCategory){
            throw new ErrorHandler(404,'Category not found...',false)
        }
        return({message:'Category updated successfully'}) 
    }
} 