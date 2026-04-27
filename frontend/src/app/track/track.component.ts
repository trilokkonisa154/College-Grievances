import { Component, OnInit } from '@angular/core';
import { GrievanceService } from '../services/grievance.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-track',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './track.component.html'
})
export class TrackComponent implements OnInit {

  grouped: { [key: string]: any[] } = {};
  user: any;

  selectedCategory = "All";
  categories: string[] = [];
  originalData: any[] = [];

  baseUrl = "http://localhost:5000";

  constructor(
    private g: GrievanceService,
    private location: Location
  ) {}

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user") || "{}");

    this.g.getAll().subscribe({
      next: (res: any) => {

        const data = (res || []).sort((a:any,b:any)=>
          b._id.toString().localeCompare(a._id.toString())
        );

        this.originalData = data;

        const set = new Set<string>();

        data.forEach((x:any)=>{
          set.add(x.category || "Other");
        });

        this.categories = ["All", ...Array.from(set)];

        this.grouped = this.groupByCategory(data);
      },
      error: (err:any)=>{
        console.log(err);
      }
    });
  }

  groupByCategory(data:any[]) {

    const result:any = {};

    data.forEach((x:any)=>{

      if(!result[x.category]){
        result[x.category] = [];
      }

      result[x.category].push(x);

    });

    return result;
  }

  update(id:any,status:any){
    this.g.updateStatus({id,status}).subscribe(()=>{
      this.ngOnInit();
    });
  }

  filterCategory(){

    let filtered = this.originalData;

    if(this.selectedCategory !== "All"){
      filtered = this.originalData.filter((x:any)=>
        x.category === this.selectedCategory
      );
    }

    this.grouped = this.groupByCategory(filtered);
  }
}