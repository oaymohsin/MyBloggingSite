import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './admin-module-components/dashboard/dashboard.component';
import { UploadComponent } from './admin-module-components/upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierComponent } from './admin-module-components/notifier/notifier.component';
import { UploadMerchandiseComponent } from './admin-module-components/upload-merchandise/upload-merchandise.component';
import { HeaderComponent } from '../main-module/mainModuleComponents/header/header.component';
import { MainModuleModule } from '../main-module/main-module.module';
import { MainModuleRoutingModule } from '../main-module/main-module-routing.module';

@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    NotifierComponent,
    UploadMerchandiseComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MainModuleModule,
  ],
})
export class AdminModule {}
