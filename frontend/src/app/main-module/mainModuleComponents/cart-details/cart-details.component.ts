import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css'],
})
export class CartDetailsComponent {
  // @ViewChild('getproductId') getproductId: any;

  constructor(
    private readonly DataManagementService: DataManagementService,
    private readonly router: Router
  ) {}
  CartArray: any = [];
  Url = 'http://localhost:4587/';
  CartSummary: any = {
    amount: 0,
    Tax: 0,
    Delivery: 0,
    Discount: 0,
    Total: 0,
  };

  ngOnInit(): void {
    this.FetchCartDetails();
  }

  FetchCartDetails() {
    let userId = localStorage.getItem('userId');
    //If User is logged in
    if (userId) {
      this.DataManagementService.GetCartDataById(userId).subscribe(
        (cartArray: any) => {
          cartArray.Result.forEach((element: any) => {
            this.CartArray.push(element);
          });
          console.log(this.CartArray);

          let price = 0;

          this.CartArray.forEach((element: any) => {
            price = price + +(element.price * element.productQuantity);
            console.log(element.price);
          });

          this.CartSummary.amount = price;
          this.CartSummary.Tax = (5 / 100) * price;
          this.CartSummary.Delivery = 200;
          this.CartSummary.Discount = (10 / 100) * price;
          this.CartSummary.Total =
            price +
            this.CartSummary.Tax +
            this.CartSummary.Delivery -
            this.CartSummary.Discount;
        }
      );
    }

    // console.log(this.CartSummary);
  }

  removeItemfromCart(productId: any) {
    // if (!localStorage.getItem('access-token')) {
    //   this.DataManagementService.removeFromCart(productId);
    //   // this.removeCart = false;
    // } else {
    //Delete Cart from Database

    this.DataManagementService.DeleteCartDataById(productId).subscribe(
      (data: any) => {
        // console.warn(result);
        let userId = localStorage.getItem('userId');
        if (data && data.Result && data.Result.deletedCount > 0) {
          console.log(data.Result.deletedCount);
          // this.removeCart = false;
          this.DataManagementService.GetCartDataById(userId).subscribe(
            (data: any) => {
              this.DataManagementService.cartDataEmitter(data.Result);
              this.CartArray = [];
              // this.FetchCartDetails();
              // console.log(data);
            }
          );
          this.FetchCartDetails();
        }
      }
    );
  }
  checkout() {
    this.router.navigate(['/checkout']);
  }
}
