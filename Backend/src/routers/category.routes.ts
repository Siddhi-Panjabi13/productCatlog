import express, { Request,Response } from 'express'
import { CategoryService } from '../services'
import { CategoryController } from '../controllers';
import { verifyRole } from '../middleware/verifyAdmin';
const router=express.Router()
const categoryService=new CategoryService();
const categoryController=new CategoryController(categoryService);
router.get('/getCategories',(req:Request,res:Response)=>categoryController.getAllCategories(req,res))
router.post('/createCategory',verifyRole(['Admin']),(req:Request,res:Response)=>categoryController.createCategory(req,res));
router.put('/updateCategory/:id',verifyRole(['Admin']),(req:Request,res:Response)=>categoryController.updateCategory(req,res));
router.delete('/deleteCategory/:id',verifyRole(['Admin']),(req:Request,res:Response)=>categoryController.deleteCategory(req,res));
router.get('/getCategoryById/:id',(req:Request,res:Response)=>categoryController.getCategoryById(req,res))
export default router;
