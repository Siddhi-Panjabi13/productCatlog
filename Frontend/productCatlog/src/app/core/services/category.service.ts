import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }
  createCategory(categoryData:any):Observable<any>{
    return this.httpClient.post('http://localhost:8000/api/categories/createCategory',categoryData);
  }
  getAllCategories():Observable<any>{
    return this.httpClient.get('http://localhost:8000/api/categories/getCategories');
  }
  updateCategory(id:any,categoryData:any):Observable<any>{
    return this.httpClient.put(`http://localhost:8000/api/categories/updateCategory/${id}`,categoryData);
  }
  deleteCategory(id:any):Observable<any>{
    return this.httpClient.delete(`http://localhost:8000/api/categories/deleteCategory/${id}`);
  }
}
