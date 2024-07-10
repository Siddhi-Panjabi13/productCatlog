import { ErrorHandler } from "../handlers/errorHandler";
import { ICATEGORY } from "../interfaces";
import { CategoryService } from "../services/category.service";
import { Request, Response } from "express";
import mongoose, { ObjectId } from "mongoose";
export class CategoryController {
  constructor(private categoryService: CategoryService) { }
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.json(categories);
    }
    catch (err: any) {
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
      }
      else {
        res.status(500).json('Internal Server Error');
      }
    }
  }
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryName } = req.body;
      const categoryData = { categoryName }
      const existCategory = await this.categoryService.findCategoryByNameService(categoryData.categoryName);

      if (existCategory) {
        res.json({ message: "Category Already exists" });
      }

      const newCategory: ICATEGORY = await this.categoryService.createCategoryService(categoryData);
      res.json({ message: "Category Added" });
    }
    catch (error: any) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json(error.message);
        return
      }
      else {
        res.status(500).json('Internal Server Error');
        return
      }
    }
  }
  async deleteCategory(req: Request, res: Response): Promise<void> {

    try {
      const { id }: any = req.params;



      const category: object = await this.categoryService.deleteCategoryService(id);
      res.json(category);
      return
    } catch (err: any) {
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
        return
      }
      res.json({ message: err.message });
      return
    }
  }
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {

      const { id }: any = req.params
      const { categoryName } = req.body;
      const updateCategory: object = await this.categoryService.updateCategoryService(id, { categoryName })
      res.json(updateCategory);
    } catch (err: any) {
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message)
        return
      }
      res.json({ message: err.message });
    }
  }
  async getCategoryById(req: Request, res: Response) {
    try {

      let { id }:any = req.params
      id=new mongoose.Types.ObjectId(id)
      
      const category =await this.categoryService.getCategoryById(id)
      res.json(category)
      }
    catch (error:any) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json(error.message)
        return
      }
      res.json({ message: error.message });
    }
  }

}