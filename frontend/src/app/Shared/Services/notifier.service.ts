import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from 'src/app/admin/admin-module-components/notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar:MatSnackBar) { }

  showNotification(){
    this.snackbar.openFromComponent(NotifierComponent,{
      data:{
        message:'Notification Message',
        buttonText:'Button Text'
      },
      duration:3000,
      horizontalPosition:'center',
      verticalPosition:'top',
      panelClass:['snackclass']
    })
  }
}
