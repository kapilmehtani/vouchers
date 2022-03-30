import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoucherDetailComponent } from '../admin/voucher-detail/voucher-detail.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { ApprovedVouchersComponent } from './approved-vouchers/approved-vouchers.component';
import { EscalationsComponent } from './escalations/escalations.component';
import { HeaderComponent } from './header/header.component';
import { VerifyUserComponent } from './verify-user/verify-user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UsersComponent } from './users/users.component';
import { VerifyVouchersComponent } from './verify-vouchers/verify-vouchers.component';
import { IssueComponent } from '../admin/issue/issue.component';
import { FaqComponent } from '../components/faq/faq.component';
import { ContactUsComponent } from '../components/contact-us/contact-us.component';
import { TermsComponent } from '../components/terms/terms.component';

const routes: Routes = [
  {path :'', component:AdminPortalComponent,children:[
    { path: 'home', component:AdminHomeComponent},
    { path: 'approved', component:ApprovedVouchersComponent},
    { path: 'verify', component:VerifyVouchersComponent},
    { path: 'users', component:UsersComponent},
    { path: 'user/:id', component:UserDetailComponent},
    {path:'voucher/:id',component:VoucherDetailComponent},
    { path: 'verify-users', component:VerifyUserComponent},
    { path: 'escalations', component:EscalationsComponent},
    {path:'issue/:id',component:IssueComponent},
    { path: 'faq', component:FaqComponent},
    { path: 'contactUs', component:ContactUsComponent},
    { path: 'T&C', component:TermsComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
  ]},
    { path: '**', component:AdminPortalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
