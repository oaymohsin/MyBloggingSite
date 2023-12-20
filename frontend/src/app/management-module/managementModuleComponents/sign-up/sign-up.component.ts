import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserManagementService } from 'src/app/Shared/Services/user-management.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
public signUpForm:FormGroup | any;

constructor(
  public FormBuilder:FormBuilder,
  public UserManagementService:UserManagementService
){this.myFormModel()}



myFormModel(){
  this.signUpForm=this.FormBuilder.group({
    fullName:new FormControl(''),
    email:new FormControl(''),
    phone:new FormControl(''),
    // roleType:new FormControl(''),
    password:new FormControl(''),
    repeatPassword: new FormControl('')
  })
}

registerUser(){
  let userFromValues=this.signUpForm.value;
  this.UserManagementService.registerUser(userFromValues).subscribe((res:any)=>{
    res;
    this.signUpForm.reset();
  })
  console.log(userFromValues);
}
}
