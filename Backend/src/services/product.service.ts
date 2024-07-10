import mongoose, { PipelineStage } from "mongoose";
import { IPRODUCT, IPRODUCTFILTER, IUPDATEPRODUCT } from "../interfaces";
import { Product } from "../models";
import { ErrorHandler } from "../handlers/errorHandler";
import fs from 'fs'
export class ProductService {
  async getProductsService(filters?: IPRODUCTFILTER): Promise<IPRODUCT[]> {
    const pipeline: PipelineStage[] = [
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category_obj",
        },
      },
      {
        $unwind: {
          path: "$category_obj",
        },
      },
      {
        $addFields: {
          categoryName: "$category_obj.categoryName",
        },
      },
    ];
    if (filters) {
      const filterArray = [
        ...(filters.minPrice !== undefined
          ? [{ price: { $gte: Number(filters.minPrice) } }]
          : []),
        ...(filters.maxPrice !== undefined
          ? [{ price: { $lte: Number(filters.maxPrice) } }]
          : []),
        ...(filters.categoryName !== undefined
          ? [{ categoryId: filters.categoryName }]
          : []),
      ];
      if (filterArray.length > 0) {
        pipeline.push({
          $match: {
            $and: filterArray,
          },
        });
      }
    }
   
    const searchQuery: PipelineStage.Match | null = filters?.query ?
      {
        $match: {
          $or: [
            {
              productName: {
                $regex: filters.query,
                $options: "i",
              },
            },
            {
              description: {
                $regex: filters.query,
                $options: "i",
              },
            },
            {
              categoryName: {
                $regex: filters.query,
                $options: "i",
              },
            },
          ],
        },
      }
      : null;
    if (searchQuery) {
      pipeline.push(searchQuery)
    }
    const products = await Product.aggregate(pipeline);
    if (!products) {
      throw new ErrorHandler(404, 'Product not found', false);
    }
    if (products.length == 0) {
      throw new ErrorHandler(400, 'No content available', false);
    }
    return products
  }
  async createProductService(productData: IPRODUCT): Promise<IPRODUCT> {
    const product = await Product.create(productData);
    return product
  }
  async getProductByName(productName: string): Promise<IPRODUCT | null> {
    const product = await Product.findOne({ productName: productName });
    return product
  }
  async deleteProductService(id: mongoose.Types.ObjectId): Promise<object> {
    const deleteProduct = await Product.findByIdAndDelete(id)
    if (!deleteProduct) {
      throw new ErrorHandler(404, 'Product not found', false);
    }
    return { message: 'Product deleted successfully' };
  }
  async updateProductService(id: mongoose.Types.ObjectId, productData: IUPDATEPRODUCT): Promise<object> {

    if (productData.imageURL) {
      const product = await this.getProductByIdService(id)
      fs.unlink(product.imageURL, (err) => {
        if (err) {
          console.error('Error deleting image:', err);

        } else {
          console.log('Image deleted successfully');
        }
      });
    }
    const updateProduct = await Product.findByIdAndUpdate(id, productData);
    if (!updateProduct) {
      throw new ErrorHandler(404, 'Product not found', false)
    }
    return { message: 'Product updated successfully' };
  }
  async getProductByIdService(id: mongoose.Types.ObjectId): Promise<IPRODUCT> {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      throw new ErrorHandler(404, 'Product not found', false);
    }
    else {
      return product
    }
  }
}