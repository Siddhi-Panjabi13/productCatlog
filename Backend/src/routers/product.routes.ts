import express, { Request, Response } from 'express';
import { verifyRole } from '../middleware/verifyAdmin';
import { ProductController } from '../controllers';
import { ProductService } from '../services';
import { upload } from '../middleware/multer';
const productService = new ProductService();
const productController = new ProductController(productService);
const router = express.Router();
router.post('/createProduct',
    upload.fields([{
        name: "imageURL",
        maxCount: 1,
    }])
    , verifyRole(['Admin']), (req: Request, res: Response) => productController.createProduct(req, res))
router.get('/getAllProducts', (req: Request, res: Response) => productController.getProducts(req, res))
router.put('/updateProduct/:id',upload.fields([{
    name: "imageURL",
    maxCount: 1,
}])
, verifyRole(['Admin']),(req:Request,res:Response)=>productController.editProduct(req,res))
router.delete('/deleteProduct/:id',verifyRole(['Admin']), (req: Request, res: Response) => productController.deleteProduct(req, res))
