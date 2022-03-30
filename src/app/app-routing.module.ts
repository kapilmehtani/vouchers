import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyOrdersComponent } from './components/buy-orders/buy-orders.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { FilterComponent } from './components/filter/filter.component';
import { HomeComponent } from './components/home/home.component';
import { IssueComponent } from './components/issue/issue.component';
import { LoginComponent } from './components/login/login.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SellOrdersComponent } from './components/sell-orders/sell-orders.component';
import { SellComponent } from './components/sell/sell.component';
import { SignupComponent } from './components/signup/signup.component';
import { SuccessComponent } from './components/success/success.component';
import { TermsComponent } from './components/terms/terms.component';
import { VoucherDetailComponent } from './components/voucher-detail/voucher-detail.component';
import { WalletComponent } from './components/wallet/wallet.component';


const routes: Routes = [
  {path:'home',component:HomeComponent, pathMatch:'full'},
  {path:'voucher/:id',component:VoucherDetailComponent},
  {path:'profile',component:MyProfileComponent},
  {path:'sell-orders',component:SellOrdersComponent},
  {path:'buy-orders',component:BuyOrdersComponent},
  {path:'cart',component:CartComponent},
  {path:'checkout',component:CheckoutComponent},
  { path:'filter',component:FilterComponent},
  { path :'wallet' , component: WalletComponent},
  { path:'payment-success',component: SuccessComponent},
  { path :'faq' , component: FaqComponent},
  { path :'T&C' , component: TermsComponent},
  { path :'contactUs' , component: ContactUsComponent},
  { path: 'issue/:id', component :IssueComponent},
  //Lazy loading admin, don't import adminmodule in app.module.ts
  { path: 'admin', loadChildren:()=>import('./admin/admin.module')
    .then(mod=>mod.AdminModule)},
  {path:"**",redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
