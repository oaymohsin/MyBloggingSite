import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagementModuleRoutingModule } from './management-module-routing.module';
import { SignUpComponent } from './managementModuleComponents/sign-up/sign-up.component';
import { SignInComponent } from './managementModuleComponents/sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignOutComponent } from './managementModuleComponents/sign-out/sign-out.component';


@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    SignOutComponent
  ],
  imports: [
    CommonModule,
    ManagementModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManagementModuleModule { }
