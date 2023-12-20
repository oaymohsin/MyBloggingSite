import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  // productId:any;
  productArray: object | any;
  Url = 'http://localhost:4587/';
  constructor(
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute
  ) {
    this.fetchdatafrombackend();
  }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    this.dataManagementService
      .GetDataById(productId)
      .subscribe((datafrombackend: any) => {
        this.productArray = datafrombackend.Result;
        console.warn(productId);
        console.warn(this.productArray);
      });
  }
  fetchdatafrombackend() {}
}
