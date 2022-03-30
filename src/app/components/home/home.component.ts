import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { VoucherService } from 'src/app/services/voucher.service';
import * as fromApp from 'src/app/store/app.reducer'
import { DialogComponent } from '../dialog/dialog.component';
import { SellComponent } from '../sell/sell.component';
import { FormControl, FormGroup } from '@angular/forms';
import { CompanyCategoryService } from 'src/app/services/company-category.service';
import { Category } from 'src/app/store/categoryStore/category.reducer';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vouchers=[];
  isLoading=false;
  categories: Category[] = [];
  userId;
  constructor(private store:Store<fromApp.AppState>,private voucherService:VoucherService,

    public dialog: MatDialog,private companyCategoryService: CompanyCategoryService, private route:Router) { }

  ngOnInit(): void {
    this.voucherService.getVerifiedVoucher();
    this.store.select('voucher').subscribe((state)=>{
      this.vouchers=state.verifiedVouchers;
      this.isLoading = state.isLoading;
    })
    this.companyCategoryService.getCategory();
    this.store.select('category').subscribe((state) => {
      this.categories = state.category;
      this.isLoading=state.isLoading;
      // console.log(this.categories);

    });
    this.store.select('auth').subscribe((state)=>{this.userId=state.user.userId});
  }


  openSellDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: SellComponent,
      },
    });
  }

  openLoginDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: LoginComponent,
      },
    });
  }


  searchForm = new FormGroup({
    input: new FormControl(null),
  });

  searchVoucher() {
    this.voucherService.searchVoucher(this.searchForm.value);
  }

  routeToFilter(event,id){
    this.route.navigateByUrl('/filter',{ state:{ categoryId:id}})
  }

}
