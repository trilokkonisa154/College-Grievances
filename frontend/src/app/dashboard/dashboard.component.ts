import {Component,OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GrievanceService} from '../services/grievance.service';
import {Chart} from 'chart.js/auto';

@Component({
 selector:'app-dashboard',
 standalone:true,
 imports:[CommonModule],
 templateUrl:'./dashboard.component.html'
})

export class DashboardComponent implements OnInit{

 user:any={};
 chart:any;

 total=0;
 pending=0;
 progress=0;
 resolved=0;

 academic=0;
 hostel=0;
 exam=0;
 infra=0;
 other=0;

 constructor(
  private router:Router,
  private g:GrievanceService
 ){}

 ngOnInit(){

  this.user=JSON.parse(localStorage.getItem("user")||"{}");

  this.g.getAll().subscribe((res:any[])=>{

   let data=res;

   if(this.user.role!='admin'){
    data=res.filter((g:any)=>
     g.userMongoId===this.user._id
    );
   }

   this.total=data.length;

   this.pending=data.filter((g:any)=>g.status=="Pending").length;
   this.progress=data.filter((g:any)=>g.status=="In Progress").length;
   this.resolved=data.filter((g:any)=>g.status=="Resolved").length;

   this.academic=data.filter((g:any)=>g.category=="Academic").length;
   this.hostel=data.filter((g:any)=>g.category=="Hostel").length;
   this.exam=data.filter((g:any)=>g.category=="Examination").length;
   this.infra=data.filter((g:any)=>g.category=="Infrastructure").length;
   this.other=data.filter((g:any)=>g.category=="Other").length;
   
   setTimeout(()=>{
    this.loadChart();
    },100);
  });

 }

 loadChart(){
 if(this.chart){
  this.chart.destroy();
 }

 if(this.user.role=="admin"){

  this.chart=new Chart("dashboardChart",{

   type:"bar",

   data:{
    labels:[
     "Academic",
     "Hostel",
     "Examination",
     "Infrastructure",
     "Other"
    ],

    datasets:[
     {
      label:"Complaints",
      data:[
       this.academic,
       this.hostel,
       this.exam,
       this.infra,
       this.other
      ],
      backgroundColor:[
       "#4f46e5",
       "#22c55e",
       "#f59e0b",
       "#ef4444",
       "#6366f1"
      ]
     }
    ]

   },
    options:{
    responsive:true,
    maintainAspectRatio:false
    }

  });

 }

 else{

  this.chart=new Chart("dashboardChart",{

   type:"pie",

   data:{
    labels:[
     "Pending",
     "In Progress",
     "Resolved"
    ],

    datasets:[
     {
      data:[
       this.pending,
       this.progress,
       this.resolved
      ],
      backgroundColor:[
       "#facc15",
       "#3b82f6",
       "#22c55e"
      ]
     }
    ]

   },

   options:{
    responsive:true
   }
  });
 }
}

 go(path:string){
  this.router.navigate([path]);
 }

 logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
 }

}