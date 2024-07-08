import { ErrorHandler } from "../handlers/errorHandler";
import { IPRODUCT } from "../interfaces";
import { ProductService } from "../services";
import { Request, Response } from "express";
export class ProductController {
    constructor(private productService: ProductService) { }
    async getProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await this.productService.getProductsService();
            res.json(products)
        }
        catch (err) {
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json(err.message);
            }
            else {
                res.status(500).json('Internal server error');

            }
        }
    }
    async createProduct(req: Request, res: Response) {
        try {
            let { productName, description, imageURL, price, categoryId } = req.body
            const files = req.files as { [fieldname: string]: Express.Multer.File[] };
            const profilePicLocalPath = files?.imageURL?.[0]?.path;

            imageURL = profilePicLocalPath

            if (!imageURL) {
                throw new ErrorHandler(400, 'Profile picture is required', false);

            }
            const productData = { productName, description, imageURL, price, categoryId };

            const existProduct = await this.productService.getProductByName(productName)

            if (existProduct) {
                res.json({ message: "product already exist" })
                return
            }
            else {
                const product = await this.productService.createProductService(productData)
                res.json({ message: 'Product created successfully' })
            }
        }
        catch (err) {
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json(err.message);
            }
            else {
                res.status(500).json('Internal server error');

            }
        }
    }
    async deleteProduct(req: Request, res: Response) {
        try {
            const { id }: any = req.params
            const deleteProduct = await this.productService.deleteProductService(id)
            res.json(deleteProduct);

        }
        catch (err: any) {
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json(err.message);
                return
            }
            res.status(500).json('Internal server error');
        }
    }
    async editProduct(req: Request, res: Response) {
        try {
            const {productId}:any=req.params;
            let { productName, description, imageURL, price, categoryId } = req.body
            if (imageURL) {
                const files = req.files as { [fieldname: string]: Express.Multer.File[] };
                const profilePicLocalPath = files?.imageURL?.[0]?.path;

                imageURL = profilePicLocalPath
                if (!imageURL) {
                    throw new ErrorHandler(400, 'Profile picture is required', false);

                }
                const productData = { productName, description, imageURL, price, categoryId };

                const existProduct = await this.productService.getProductByName(productName)
    
                if (existProduct) {
                    res.json({ message: "product already exist" })
                    return
                }
                else {
                    const product = await this.productService.updateProductService(productId,productData)
                    res.json(product)
                }
            }

        } catch (err) {
            if (err instanceof ErrorHandler) {
                res.status(err.statusCode).json(err.message);
                return
            }
            res.status(500).json('Internal server error');
        }
    }
}