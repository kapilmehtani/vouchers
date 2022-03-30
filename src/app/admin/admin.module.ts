import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HeaderComponent } from './header/header.component';
import { VerifyVouchersComponent } from './verify-vouchers/verify-vouchers.component';
import { MatTableModule } from '@angular/material/table';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { ApprovedVouchersComponent } from './approved-vouchers/approved-vouchers.component';
import { UsersComponent } from './users/users.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { EscalationsComponent } from './escalations/escalations.component'
import { VerifyUserComponent } from './verify-user/verify-user.component'
import { VoucherCardComponent } from './voucher-card/voucher-card.component';
import { VoucherDetailComponent } from './voucher-detail/voucher-detail.component';
import { ChartsModule, MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { IssueComponent } from './issue/issue.component';
import {MatBadgeModule} from '@angular/material/badge';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoDataComponent } from './no-data/no-data.component';


console.log('Admin module loaded')
@NgModule({
  declarations: [
    AdminHomeComponent,
    HeaderComponent,
    VerifyVouchersComponent,
    AdminPortalComponent,
    ApprovedVouchersComponent,
    UsersComponent,
    UserDetailComponent,
    EscalationsComponent,
    VoucherCardComponent,
    VoucherDetailComponent,
    VerifyUserComponent,
    IssueComponent,
    LoaderComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatTableModule,
    ReactiveFormsModule,
    ChartsModule,
    MatBadgeModule,
    MDBBootstrapModule.forRoot(),
    MatProgressSpinnerModule
  ]
})
export class AdminModule { }
