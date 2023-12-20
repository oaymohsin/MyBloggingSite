import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserManagementService } from '../Services/user-management.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserManagementGuard implements CanActivate {
  constructor(private userManagementService:UserManagementService, private Router:Router,
    private snackbar:MatSnackBar){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.userManagementService.checkIfUserLogin() || this.userManagementService.CheckUserPrivilege()!=='Admin'){
        this.Router.navigate(['/management/sign-in'])
        this.snackbar.open('You don'+"'"+'t have access to Admin Panel','close',{
          horizontalPosition:'center',
          verticalPosition:'top',
          duration:6000
        })
        return false;
        
      }else{
        
        return true;
      }
    
  }
  
}
