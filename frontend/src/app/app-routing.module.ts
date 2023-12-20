import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementGuard } from './Shared/Guards/user-management.guard';

const routes: Routes = [
  {path:"",loadChildren:()=>import ('./main-module/main-module.module').then(m=>m.MainModuleModule)},
  {path:"main",loadChildren:()=>import('./main-module/main-module.module').then(m=>m.MainModuleModule)},
  {path:"management",loadChildren:()=>import('./management-module/management-module.module').then(m=>m.ManagementModuleModule)},
  {path:"admin",canActivate:[UserManagementGuard],loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
