import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voucher } from 'src/app/store/voucherStore/voucher.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';

import { CartService } from 'src/app/services/cart.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit {
  voucherId: number;
  isLoading = false;
  voucher: Voucher;
  sellerRating;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private voucherService:VoucherService,
    private ratingService:RatingService
  ) {}

  ngOnInit(): void {
    this.voucherService.getVerifiedVoucher();
    this.activatedRoute.params.subscribe((params) => {
      this.voucherId = params?.id;
    });
    this.store.select('voucher').subscribe((state) => {
      if (this.voucherId) {
        state.verifiedVouchers.forEach((voucher) => {
          if (this.voucherId == voucher.id) {
            this.voucher = voucher;
            this.ratingService.getRatingById(voucher.seller.id);
          }
        });
      }
      this.isLoading = state.isLoading;
    });

    this.ratingService.sellerRating.subscribe((rating)=>{
      this.sellerRating=rating;
    })

  }


}
