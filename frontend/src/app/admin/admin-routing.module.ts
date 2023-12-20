import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './admin-module-components/dashboard/dashboard.component';
import { UploadComponent } from './admin-module-components/upload/upload.component';
import { UserManagementGuard } from '../Shared/Guards/user-management.guard';
import { UploadMerchandiseComponent } from './admin-module-components/upload-merchandise/upload-merchandise.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dash-board', component: DashboardComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'upload-merchandise', component: UploadMerchandiseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
