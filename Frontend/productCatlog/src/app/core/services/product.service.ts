import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPRODUCT } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
  createProduct(productData:IPRODUCT){
    return this.httpClient.post('http://localhost:8000/api/products/createProduct',productData);
  }
  getProducts(){
    return this.httpClient.get('http://localhost:8000/api/products/getAllProducts')
  }
  getProductById(id:any){
    return this.httpClient.get(`http://localhost:8000/api/products/getProductById/${id}`);
  }
  updateProductById(id:any,productData:any){
    return this.httpClient.put(`http://localhost:8000/api/products/updateProduct/${id}`,productData);
  }
  deleteProductById(id:any){
    return this.httpClient.delete(`http://localhost:8000/api/products/deleteProduct/${id}`);
  }
}
