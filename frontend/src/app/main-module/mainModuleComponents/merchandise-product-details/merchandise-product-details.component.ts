import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';

@Component({
  selector: 'app-merchandise-product-details',
  templateUrl: './merchandise-product-details.component.html',
  styleUrls: ['./merchandise-product-details.component.css'],
})
export class MerchandiseProductDetailsComponent {
  @ViewChild('ItemQuantity') ItemQuantity: ElementRef | any;
  itemQuantityDefault: number | any;
  productArray: object | any;
  Url = 'http://localhost:4587/';
  removeCart = false;
  idArray = [];

  constructor(
    private dataManagementService: DataManagementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('productId');
    this.dataManagementService
      .GetMerchandiseDataById(productId)
      .subscribe((datafromBackend: any) => {
        this.productArray = datafromBackend.Result;
        // console.log(this.ItemQuantity.nativeElement.defaultValue);
        // console.log(this.productArray);
      });

    //Change add to cart and remove to cart buttons when user are not logged in
    let cartData = localStorage.getItem('localcart');
    if (productId && cartData) {
      let items = JSON.parse(cartData);

      items = items.filter((item: any) => {
        return productId === item._id;
        // console.log(item._id);
        // return 1;
      });
      // console.log(items.length);

      // console.log(items.length);
      if (items.length > 0) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
    //If any user have this product in the cart in db then change add to cart to remove from cart button

    let userId = localStorage.getItem('userId');
    let CurrentUserCart: any = [];
    if (userId) {
      this.dataManagementService
        .GetCartDataById(userId)
        .subscribe((data: any) => {
          // CurrentUserCart.push(...data.Result);
          this.dataManagementService.cartDataEmitter(data.Result);
          let CurrentItemExist = data.Result.filter((item: any) => {
            return item.productId === productId;
            // console.log(productId);
            // console.log(item.productId);
          });
          // console.log(CurrentItemExist);

          if (CurrentItemExist.length > 0) {
            this.removeCart = true;
          } else {
            this.removeCart = false;
          }
          // console.log(data.Result);
        });
    }

    //If any user have this product in the cart in db then change add to cart to remove from cart button
  }

  plus() {
    this.ItemQuantity.nativeElement.defaultValue++;
    this.itemQuantityDefault = this.ItemQuantity.nativeElement.defaultValue;
    // this.itemQuantityDefault++;
  }
  minus() {
    if (this.ItemQuantity.nativeElement.defaultValue > 0) {
      this.ItemQuantity.nativeElement.defaultValue--;
      this.itemQuantityDefault = this.ItemQuantity.nativeElement.defaultValue;

      // this.productArray.itemquantity = this.itemQuantityDefault;
      // console.log(this.productArray);
    }
  }

  // controlButton() {
  //   if (this.ItemQuantity.nativeElement.defaultValue != 0) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  AddtoCart() {
    let UserId = localStorage.getItem('userId');

    if (!localStorage.getItem('access-token')) {
      this.productArray.itemquantity = Number(this.itemQuantityDefault);
      this.productArray.productId =
        this.route.snapshot.paramMap.get('productId');

      this.dataManagementService.AddToLocalCart(this.productArray);
      // console.log(this.productArray.length);
      // this.dataManagementService.cartDataEmitter(this.productArray);
      this.removeCart = true;
    } else {
      // console.log(UserId);
      // let ParsedUserId=JSON.parse(UserId);
      let cartData = {
        ...this.productArray,
        userId: UserId,
        productId: this.route.snapshot.paramMap.get('productId'),
        productQuantity: this.itemQuantityDefault,
      };
      this.dataManagementService.AddToCart(cartData).subscribe((result) => {
        this.dataManagementService
          .GetCartDataById(UserId)
          .subscribe((data: any) => {
            this.dataManagementService.cartDataEmitter(data.Result);
            // console.log(data);
          });
      });
      this.removeCart = true;
    }
  }
  removeFromCart(id: any) {
    if (!localStorage.getItem('access-token')) {
      this.dataManagementService.removeFromCart(id);
      this.removeCart = false;
    } else {
      //Delete Cart from Database

      this.dataManagementService
        .DeleteCartDataById(id)
        .subscribe((data: any) => {
          // console.warn(result);
          let userId = localStorage.getItem('userId');
          if (data && data.Result && data.Result.deletedCount > 0) {
            console.log(data.Result.deletedCount);
            this.removeCart = false;
            this.dataManagementService
              .GetCartDataById(userId)
              .subscribe((data: any) => {
                this.dataManagementService.cartDataEmitter(data.Result);
                // console.log(data);
              });
          }
        });

      // console.warn('User logged In');
    }
  }
}
