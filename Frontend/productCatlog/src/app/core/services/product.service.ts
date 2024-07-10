import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPRODUCT } from '../interfaces/product.interface';
import { Observable } from 'rxjs';
import { IPRODUCTFILTER } from '../interfaces/productSearchFilter.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}
  createProduct(productData: IPRODUCT) {
    return this.httpClient.post(
      'http://localhost:8000/api/products/createProduct',
      productData
    );
  }

  getProducts(filters?: {
    query?: string;
    categoryName?: string;
    minPrice?:number;
    maxPrice?:number;
  }): Observable<any> {
    let params=new HttpParams();
    if(filters?.query){
      params=params.set('query',filters.query);
    }
    if(filters?.categoryName){
      params = params.set('categoryName',filters.categoryName);
    }
    if(filters?.minPrice){
      params = params.set('minPrice',filters.minPrice);
    }
    if(filters?.maxPrice){
      params = params.set('maxPrice',filters.maxPrice);
    }
    return this.httpClient.get('http://localhost:8000/api/products/getAllProducts',{params})
  }
  getProductById(id: any) {
    return this.httpClient.get(
      `http://localhost:8000/api/products/getProductById/${id}`
    );
  }
  updateProductById(id: any, productData: any) {
    return this.httpClient.put(
      `http://localhost:8000/api/products/updateProduct/${id}`,
      productData
    );
  }
  deleteProductById(id: any) {
    return this.httpClient.delete(
      `http://localhost:8000/api/products/deleteProduct/${id}`
    );
  }
}
