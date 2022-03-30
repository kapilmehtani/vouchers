import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent } from '../login/login.component';
import {} from '@angular/material/menu';
import { SellComponent } from '../sell/sell.component';
import { FormControl, FormGroup } from '@angular/forms';
import { VoucherService } from 'src/app/services/voucher.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import * as fromAuthAction from 'src/app/store/authStore/auth.actions'
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  cartVouchers=[];
  isLoading=false;

  token = '';
  constructor(
    private voucherService: VoucherService,
    private authService:AuthService,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    // this.notificationService.changeNotificationSeen();
    this.store.select('auth').subscribe((state) => {
      this.token=state.user.token;
    });
    this.store.select('cart').subscribe((state)=>{
      this.cartVouchers=state.vouchers;
      this.isLoading = state.isLoading;
    })

  }

  searchForm = new FormGroup({
    input: new FormControl(null),
  });

  searchVoucher() {
    this.voucherService.searchVoucher(this.searchForm.value);
  }

  openLoginDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: LoginComponent,
      },
    });
  }

  openSellDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: SellComponent,
      },
    });
  }

  logout() {
    this.authService.logout();
  }






}
