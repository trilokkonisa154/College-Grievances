import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient){}

  login(data:any){
    return this.http.post(`${this.baseUrl}/api/auth/login`, data);
  }

  register(data:any){
    return this.http.post(`${this.baseUrl}/api/auth/register`, data);
  }
}