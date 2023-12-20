import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  constructor(
    private readonly dataManagementService: DataManagementService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.buildform();
  }
  myuploadform: FormGroup | any;

  CartArray: any = [];
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

  buildform() {
    this.myuploadform = this.formBuilder.group({
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contact: new FormControl('', [Validators.required]),
    });
  }

  FetchCartDetails() {
    let userId = localStorage.getItem('userId');
    //If User is logged in
    if (userId) {
      this.dataManagementService
        .GetCartDataById(userId)
        .subscribe((cartArray: any) => {
          cartArray.Result.forEach((element: any) => {
            this.CartArray.push(element);
          });
          // console.log(this.CartArray);

          let price = 0;

          this.CartArray.forEach((element: any) => {
            price = price + +(element.price * element.productQuantity);
            // console.log(element.price);
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
        });
    }

    // console.log(this.CartSummary);
  }

  submitCheckoutForm() {
    let MultiPartFormData = new FormData();
    MultiPartFormData.append('email', this.myuploadform.get('email').value);
    MultiPartFormData.append('address', this.myuploadform.get('address').value);
    MultiPartFormData.append('contact', this.myuploadform.get('contact').value);
    // console.log(MultiPartFormData);
    let userId = localStorage.getItem('userId');

    let OrderData = {
      email: this.myuploadform.get('email').value,
      address: this.myuploadform.get('address').value,
      contact: this.myuploadform.get('contact').value,
      userId,
      totalPrice: this.CartSummary.Total,
    };

    this.dataManagementService.orderNow(OrderData).subscribe((data: any) => {
      if (data.Result == true) {
        this.dataManagementService
          .DeleteAllCartsByUserId(userId)
          .subscribe((response: any) => {
            console.log(response);
            if (response.Result.deletedCount >= 1) {
              this.dataManagementService.cartData.emit([]);
            }
          });
        this.router.navigate(['/my-Orders']);
      }
    });
  }
}
