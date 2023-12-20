import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainModuleComponent } from './main-module.component';
import { HomeComponent } from './mainModuleComponents/home/home.component';
import { HeaderComponent } from './mainModuleComponents/header/header.component';
import { FooterComponent } from './mainModuleComponents/footer/footer.component';
import { BusinessComponent } from './mainModuleComponents/business/business.component';
import { BlogsComponent } from './mainModuleComponents/blogs/blogs.component';
import { EducationComponent } from './mainModuleComponents/education/education.component';
import { SportsComponent } from './mainModuleComponents/sports/sports.component';
import { TechAndTelecomComponent } from './mainModuleComponents/tech-and-telecom/tech-and-telecom.component';
import { PakistanComponent } from './mainModuleComponents/pakistan/pakistan.component';
import { ChatComponent } from './mainModuleComponents/chat/chat.component';
import { ProductDetailsComponent } from './mainModuleComponents/product-details/product-details.component';
import { MerchandiseComponent } from './mainModuleComponents/merchandise/merchandise.component';
import { MerchandiseProductDetailsComponent } from './mainModuleComponents/merchandise-product-details/merchandise-product-details.component';
import { CartDetailsComponent } from './mainModuleComponents/cart-details/cart-details.component';
import { CheckoutComponent } from './mainModuleComponents/checkout/checkout.component';
import { MyOrdersComponent } from './mainModuleComponents/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    component: MainModuleComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'header', component: HeaderComponent },
      { path: 'footer', component: FooterComponent },
      { path: 'business', component: BusinessComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'education', component: EducationComponent },
      { path: 'sports', component: SportsComponent },
      { path: 'techandtelecom', component: TechAndTelecomComponent },
      { path: 'pakistan', component: PakistanComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'productDetails/:productId', component: ProductDetailsComponent },
      { path: 'merchandise', component: MerchandiseComponent },
      {
        path: 'merchandiseproductDetails/:productId',
        component: MerchandiseProductDetailsComponent,
      },
      { path: 'cartdetails', component: CartDetailsComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'my-Orders', component: MyOrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainModuleRoutingModule {}
