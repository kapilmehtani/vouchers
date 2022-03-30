import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer'
import { Voucher } from 'src/app/store/voucherStore/voucher.reducer';
import { AdminVerifyService } from 'src/app/services/admin-verify.service';

@Component({
  selector: 'app-verify-vouchers',
  templateUrl: './verify-vouchers.component.html',
  styleUrls: ['./verify-vouchers.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class VerifyVouchersComponent implements OnInit {
  unverifiedVouchers=[];
  isLoading=false;
  displayedColumns: string[] = [
    'voucherId',
    'title',
    'sellingPrice',
    'sellerEmail',
    'download',
    'buttons',
  ];
  expandedElement: Voucher | null;

  constructor(private store:Store<fromApp.AppState>,private verifyService:AdminVerifyService) { }

  ngOnInit(): void {
    this.verifyService.getAllUnverifiedVoucher();
    this.store.select('voucher').subscribe((state)=>{
      this.unverifiedVouchers=state.unverifiedVouchers;
      this.isLoading = state.isLoading;
    })
  }

  onAcceptVoucher(voucherId){
    this.verifyService.acceptVoucher(voucherId);
  }

  onRejectVoucher(voucherId){
    this.verifyService.rejectVoucher(voucherId);
  }

}
