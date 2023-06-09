import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { MainModuleComponent } from './main-module.component';
import { HeaderComponent } from './mainModuleComponents/header/header.component';
import { FooterComponent } from './mainModuleComponents/footer/footer.component';
import { HomeComponent } from './mainModuleComponents/home/home.component';
import { TechAndTelecomComponent } from './mainModuleComponents/tech-and-telecom/tech-and-telecom.component';
import { BusinessComponent } from './mainModuleComponents/business/business.component';
import { SportsComponent } from './mainModuleComponents/sports/sports.component';
import { EducationComponent } from './mainModuleComponents/education/education.component';
import { BlogsComponent } from './mainModuleComponents/blogs/blogs.component';
import { PakistanComponent } from './mainModuleComponents/pakistan/pakistan.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ChatComponent } from './mainModuleComponents/chat/chat.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MainModuleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    TechAndTelecomComponent,
    BusinessComponent,
    SportsComponent,
    EducationComponent,
    BlogsComponent,
    PakistanComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class MainModuleModule { }
