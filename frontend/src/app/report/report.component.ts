import {Component} from '@angular/core';
import {GrievanceService} from '../services/grievance.service';

import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
 selector:'app-report',
 standalone:true,
 imports:[CommonModule,FormsModule],
 templateUrl:'./report.component.html'
})
export class ReportComponent{

 title="";
 description="";
 category="Academic";
 user:any;

 selectedFile:any;
 onFileSelect(event:any){
 this.selectedFile=event.target.files[0];
}

constructor(private g:GrievanceService,
            private router:Router){
  this.user=JSON.parse(localStorage.getItem("user")||"{}");
 }

 submit(){

 if(
  !this.title?.trim() ||
  !this.description?.trim() ||
  !this.category
 ){
  alert("Please fill all fields");
  return;
 }

 const formData=new FormData();

 formData.append("title",this.title);
 formData.append("description",this.description);
 formData.append("category",this.category);
 formData.append("userMongoId",this.user._id);
 formData.append("userId",this.user.idNumber);
 formData.append("userName",this.user.name);

 if(this.selectedFile){
  formData.append("image",this.selectedFile);
 }

 this.g.submit(formData).subscribe(()=>{
  alert("Complaint Submitted Successfully");
  this.router.navigate(['/track']);
 });

}
}