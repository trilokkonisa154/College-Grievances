import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})
export class GrievanceService {

  baseUrl = environment.apiUrl;

  constructor(private http:HttpClient){}

  private headers(){
    const token = localStorage.getItem("token");

    return {
      headers:new HttpHeaders({
        Authorization:`Bearer ${token}`
      })
    };
  }

  submit(data:any){
    return this.http.post(`${this.baseUrl}/api/grievance/submit`, data, this.headers());
  }

  getAll(){
    return this.http.get(`${this.baseUrl}/api/grievance/all`, this.headers());
  }

  updateStatus(data:any){
    return this.http.post(`${this.baseUrl}/api/grievance/status`, data, this.headers());
  }

  changePassword(data:any){
    return this.http.post(`${this.baseUrl}/api/auth/change-password`, data, this.headers());
  }
}