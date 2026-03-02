import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn:'root'})
export class GrievanceService{

 constructor(private http:HttpClient){}

 getAll(){

 const token=localStorage.getItem("token");

 return this.http.get<any[]>(
  "https://grievance-backend-lr1d.onrender.com/api/grievance/all",
  {
   headers:{
    Authorization:"Bearer "+token
   }
  }
 );

}

 submit(data:any){

  const token=localStorage.getItem("token");

  return this.http.post(
   "https://grievance-backend-lr1d.onrender.com/api/grievance/submit",
   data,
   {
    headers:{
     Authorization:"Bearer "+token
    }
   }
  );
 }

 updateStatus(data:any){

  const token=localStorage.getItem("token");

  return this.http.post(
   "https://grievance-backend-lr1d.onrender.com/api/grievance/status",
   data,
   {
    headers:{
     Authorization:"Bearer "+token
    }
   }
  );
 }

}