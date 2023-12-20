import { Component } from '@angular/core';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-merchandise',
  templateUrl: './merchandise.component.html',
  styleUrls: ['./merchandise.component.css'],
})
export class MerchandiseComponent {
  Alldata: any = [];
  Url = 'http://localhost:4587/';

  constructor(private datamanagementservice: DataManagementService) {
    this.FetchDataFromBackend();
  }

  FetchDataFromBackend() {
    this.datamanagementservice.getMerchandiseData().subscribe((res: any) => {
      res.Result.forEach((element: any) => {
        this.Alldata.push(element);
      });
    });
  }
}
