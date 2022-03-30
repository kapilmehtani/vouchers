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
import { VoucherService } from 'src/app/services/voucher.service';


@Component({
  selector: 'app-approved-vouchers',
  templateUrl: './approved-vouchers.component.html',
  styleUrls: ['./approved-vouchers.component.scss'],
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
export class ApprovedVouchersComponent implements OnInit {
  verifiedVouchers=[];
  isLoading=false;
  displayedColumns: string[] = [
    'voucherId',
    'title',
    'sellingPrice',
    'sellerEmail',
    'download',
  ];
  expandedElement: Voucher | null;

  constructor(private store:Store<fromApp.AppState>,private voucherService:VoucherService) { }

  ngOnInit(): void {
    this.voucherService.getVerifiedVoucher();
    this.store.select('voucher').subscribe((state)=>{
      this.verifiedVouchers=state.verifiedVouchers;
      this.isLoading = state.isLoading;
    })
  }

}
