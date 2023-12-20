import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private HttpClient: HttpClient) {}

  registerUser(payLoad: any) {
    return this.HttpClient.post(
      'http://localhost:4587/userManagement/userRegister',
      payLoad
    );
  }
  loginUser(payLoad: any) {
    return this.HttpClient.post(
      'http://localhost:4587/userManagement/userLogin',
      payLoad
    );
  }
  setTokenLocalStorage(payLoad: any) {
    localStorage.setItem('access-token', payLoad);
  }
  checkIfUserLogin() {
    return localStorage.getItem('access-token') !== null;
    // return const userPrivilege= localStorage.getItem('userPrivilege')
  }
  CheckUserPrivilege(){
    const privilege= localStorage.getItem('userPrivilege')
    return privilege;
    console.log(privilege)
  }
}
