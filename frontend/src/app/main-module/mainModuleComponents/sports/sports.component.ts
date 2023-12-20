import { Component } from '@angular/core';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-sports',
  templateUrl: './sports.component.html',
  styleUrls: ['./sports.component.css']
})
export class SportsComponent {
  AllData:any=[]
  SportData:any=[]
  Url='http://localhost:4587/'
  
  constructor(private DataManagementService:DataManagementService){
    this.fetchDataFromBackend()
  }
  
  fetchDataFromBackend(){
    this.DataManagementService.GetData().subscribe((res:any)=>{
      res.Result.forEach((element:any) => {
        if(element.softDeleteStatus!==1){
          this.AllData.push(element)
        }
        let filteredData=this.AllData.filter((obj:any)=>{
          return obj.category==="Sports"
          //Without return filter function wouldn't work correctly
        })
        this.SportData=[]
        this.SportData.push(...filteredData);
        console.log(this.SportData)
      });
    })
  }
}
