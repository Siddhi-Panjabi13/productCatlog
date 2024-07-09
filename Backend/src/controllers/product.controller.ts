import { ErrorHandler } from "../handlers/errorHandler";
import { IPRODUCT } from "../interfaces";
import { ProductService } from "../services";
import { Request, Response } from "express";
import mongoose from "mongoose";
export class ProductController {
  constructor(private productService: ProductService) {}
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const { query } = req.query;
      const products = await this.productService.getProductsService(
        query as string
      );
      res.json(products);
    } catch (err) {
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }
  async createProduct(req: Request, res: Response) {
    try {
      let { productName, description, imageURL, price, category } = req.body;
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      // console.log(category)
      // console.log(req.body,'req.body')
      const profilePicLocalPath = files?.imageURL?.[0]?.path;
      imageURL = profilePicLocalPath;
      const categoryId = new mongoose.Types.ObjectId(category);
      // console.log(productName)
      if (!imageURL) {
        throw new ErrorHandler(400, "Product Picture is required", false);
      }
      const productData = {
        productName,
        description,
        imageURL,
        price,
        categoryId,
      };

      const existProduct = await this.productService.getProductByName(
        productName
      );

      if (existProduct) {
        res.json({ message: "product already exist" });
        return;
      } else {
        const product = await this.productService.createProductService(
          productData
        );
        res.json({ message: "Product created successfully" });
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }
  async deleteProduct(req: Request, res: Response) {
    try {
      const { id }: any = req.params;
      const deleteProduct = await this.productService.deleteProductService(id);
      res.json(deleteProduct);
    } catch (err: any) {
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
        return;
      }
      res.status(500).json("Internal server error");
    }
  }
  async editProduct(req: Request, res: Response) {
    try {
      const { id }: any = req.params;
      let { productName, description, imageURL, price, categoryId } = req.body;
      // console.log(req.body, 'req.body')
      // const existProduct = await this.productService.getProductByName(productName)

      // if (existProduct) {
      //     res.json({ message: "product already exist" })
      //     return
      // }
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const profilePicLocalPath = files?.imageURL?.[0]?.path;

      imageURL = profilePicLocalPath;

      const productData = {
        productName,
        description,
        imageURL,
        price,
        categoryId,
      };

      const product = await this.productService.updateProductService(
        id,
        productData
      );
      res.json(product);
    } catch (err) {
      console.log(err);
      if (err instanceof ErrorHandler) {
        res.status(err.statusCode).json(err.message);
        return;
      }
      res.status(500).json("Internal server error");
    }
  }
  async getProductById(req: Request, res: Response) {
    try {
      const { id }: any = req.params;
      const product = await this.productService.getProductByIdService(id);
      res.json(product);
    } catch (error) {
      if (error instanceof ErrorHandler) {
        res.status(error.statusCode).json(error.message);
      } else {
        res.status(500).json("Internal server error");
      }
    }
  }
}
