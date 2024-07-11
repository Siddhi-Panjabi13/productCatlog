import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  createUser(userData:any):Observable<any>{
    return this.httpClient.post('http://localhost:8000/api/users/createUser',userData);
  }
  loginUser(loginData:any):Observable<any>{
    return this.httpClient.post('http://localhost:8000/api/users/loginUser',loginData);
  }
  setToken(token: string): void {
    localStorage.setItem('token', JSON.stringify(token));
  }
  
  
  getToken(): string | null {
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token) : null;
  }
  setRole(role: string): void {
    localStorage.setItem('role', JSON.stringify(role));
  }
  
  
  getRole(): string | null {
    const role = localStorage.getItem('role');
    return role ? JSON.parse(role) : null;
  }

  
  
 
  clearLocalStorage(): void {
    localStorage.clear();
  }
  getLoggedInUser():Observable<any>{
    return this.httpClient.get('http://localhost:8000/api/users/getLoggedInUser');
  }
  getAllUsers(){
    return this.httpClient.get('http://localhost:8000/api/users/getAllUsers');

  }
  editUser(updateData:any,id:any){
    return this.httpClient.put(`http://localhost:8000/api/users/updateUser/${id}`,updateData)
  }
  getUserById(id:any){
    return this.httpClient.get(`http://localhost:8000/api/users/getUserById/${id}`)
  }
  deleteUser(id:any){
    return this.httpClient.delete(`http://localhost:8000/api/users/deleteUser/${id}`)

  }
  hasRole(requiredRoles: string[]): boolean {
    const userRoles = this.getRole();
    return requiredRoles.some(role => role===userRoles);
  }
}
