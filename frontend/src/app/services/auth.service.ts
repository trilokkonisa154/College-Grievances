import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn:'root'})
export class AuthService{

 constructor(private http:HttpClient){}

 login(data:any){
  return this.http.post("https://grievance-backend-lr1d.onrender.com/api/auth/login",data);
 }

 register(data:any){
  return this.http.post("https://grievance-backend-lr1d.onrender.com/api/auth/register",data);
 }
}