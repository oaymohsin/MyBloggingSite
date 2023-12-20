import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserManagementService } from 'src/app/Shared/Services/user-management.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css'],
})
export class SignOutComponent {
  constructor(
    private userManagementService: UserManagementService,
    private Router: Router
  ) {}
  ngOnInit() {
    this.signout();
  }
  signout() {
    localStorage.removeItem('access-token');
    localStorage.removeItem('userPrivilege');
    localStorage.removeItem('userId');
    this.Router.navigate(['/main']);
  }
}
