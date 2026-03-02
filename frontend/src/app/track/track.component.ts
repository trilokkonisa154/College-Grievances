import {Component,OnInit} from '@angular/core';
import {GrievanceService} from '../services/grievance.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
 selector:'app-track',
 standalone:true,
 imports:[CommonModule,FormsModule],
 templateUrl:'./track.component.html'
})
export class TrackComponent implements OnInit{

 grouped:{[key:string]:any[]}={};
 user:any;

 selectedCategory="All";
 categories:string[]=[];
 originalData:any[]=[];
 constructor(private g:GrievanceService){}

 ngOnInit(){

 this.user=JSON.parse(localStorage.getItem("user")||"{}");

 this.g.getAll().subscribe((res)=>{

  let data=res;

  if(this.user.role!='admin'){
   data=res.filter((g:any)=>
    g.userMongoId===this.user._id
   );
  }

  data=data.sort((a:any,b:any)=>
 b._id.toString().localeCompare(a._id.toString())
);
this.originalData=data;

  this.categories=[
 "All",
 ...Array.from(
  new Set(
   res.map((g:any)=>g.category)
  )
 )
];

  this.grouped=this.groupByCategory(data);
 });
}

 groupByCategory(data:any[]):{[key:string]:any[]}{

 const result:{[key:string]:any[]}={};

 data.forEach(item=>{

  if(!result[item.category])
   result[item.category]=[];

  result[item.category].push(item);

 });

 return result;

}

 update(id:any,status:any){

  this.g.updateStatus({id,status}).subscribe(()=>{
   this.ngOnInit();
  });
 }

 filterCategory(){

 let filtered=this.originalData;

 if(this.selectedCategory!="All"){

  filtered=this.originalData.filter((g:any)=>
   g.category==this.selectedCategory
  );

 }

 this.grouped=this.groupByCategory(filtered);
}

getStatusClass(status:any){

 if(status=="Pending")
  return "bg-yellow-200 text-yellow-800";

 if(status=="In Progress")
  return "bg-blue-200 text-blue-800";

 if(status=="Resolved")
  return "bg-green-200 text-green-800";

 if(status=="Rejected")
  return "bg-red-200 text-red-800";

 return "";
}

}