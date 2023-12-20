import { Component } from '@angular/core';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  ordersArray: any = [];

  constructor(private readonly dataManagementService: DataManagementService) {}

  ngOnInit(): void {
    this.fetchAllOrders();
  }

  fetchAllOrders() {
    let userId = localStorage.getItem('userId');
    this.dataManagementService.GetOrdersById(userId).subscribe((Data: any) => {
      // console.log(Result);
      this.ordersArray.push(...Data.Result);
      // console.log(this.ordersArray);
    });
  }

  cancelOrder(id: any) {
    // console.log(id);
    this.dataManagementService.CancelOrderById(id).subscribe((data: any) => {
      // console.log(data);
      if (data.Result.deletedCount >= 1) {
        this.ordersArray = [];
        this.fetchAllOrders();
      }
    });
  }
}
