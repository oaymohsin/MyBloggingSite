import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataManagementService } from 'src/app/Shared/Services/data-management.service';
import { NotifierService } from 'src/app/Shared/Services/notifier.service';
import { UserManagementService } from 'src/app/Shared/Services/user-management.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  public signInForm: FormGroup | any;

  constructor(
    private readonly UserManagementService: UserManagementService,
    private readonly FormBuilder: FormBuilder,
    private readonly Router: Router,
    private snackbar: MatSnackBar,
    private snackbarservice: NotifierService,
    private readonly DataManagementService: DataManagementService
  ) {
    this.signInFormModel();
  }
  signInFormModel() {
    this.signInForm = this.FormBuilder.group({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  userSignIn() {
    let userSignInValues = this.signInForm.value;
    this.UserManagementService.loginUser(userSignInValues).subscribe(
      (res: any) => {
        // console.log(res.Data);

        if (res.Data === true) {
          if (!this.UserManagementService.checkIfUserLogin()) {
            this.UserManagementService.setTokenLocalStorage(res.Token);
            localStorage.setItem('userPrivilege', res.UserPrivilege);
            localStorage.setItem('userId', res.UserId);

            //Add local Cart Data to Db on login
            let localCartData = localStorage.getItem('localcart');
            let userId = localStorage.getItem('userId');
            if (localCartData) {
              let cartDataArray = JSON.parse(localCartData);

              cartDataArray.forEach((product: any, index: number) => {
                let cartDatatoStore = {
                  ...product,
                  userId: userId,
                  productQuantity: product.itemquantity,
                };

                delete product.itemquantity;
                // setTimeout(() => {
                this.DataManagementService.AddToCart(cartDatatoStore).subscribe(
                  (result) => {
                    if (result) {
                      console.warn('Item Stored in DB');
                    }
                  }
                );
                if (cartDataArray.length === index + 1) {
                  localStorage.removeItem('localcart');

                  this.DataManagementService.GetCartDataById(userId).subscribe(
                    (data: any) => {
                      // let emitter = JSON.parse(data.Result);

                      this.DataManagementService.cartDataEmitter(data.Result);
                    }
                  );
                }
                // }, 500);
              });
            }
            //Get Cart from Db through User Id
            setTimeout(() => {}, 2000);

            if (res.UserPrivilege === 'Admin') {
              this.Router.navigate(['/admin']);
            } else {
              this.Router.navigate(['/main']);
            }
          } else {
            console.log(`${res.UserPrivilege} already logged in`);
          }
        } else {
          console.log('Either Email or Password is incorrect');
          this.snackbar.open('Either Email or Password is incorrect', 'Close', {
            duration: 10000, // Duration in milliseconds
            panelClass: 'success-snackbar', //Custom Css class. we can customize snackbar style
            horizontalPosition: 'center', // Change to 'end' or 'center'
            verticalPosition: 'top',
          });
          this.Router.navigate(['/main']);
        }
      }
    );
  }
}
