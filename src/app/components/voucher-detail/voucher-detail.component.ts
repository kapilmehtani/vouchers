import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voucher } from 'src/app/store/voucherStore/voucher.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { QuotePriceComponent } from '../quote-price/quote-price.component';
import { CartService } from 'src/app/services/cart.service';
import { VoucherService } from 'src/app/services/voucher.service';
import { RatingService } from 'src/app/services/rating.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-voucher-detail',
  templateUrl: './voucher-detail.component.html',
  styleUrls: ['./voucher-detail.component.scss'],
})
export class VoucherDetailComponent implements OnInit {
  voucherId: number;
  isLoading = false;
  voucher: Voucher;
  userId:string;
  sellerRating;
  canQuote:boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private store: Store<fromApp.AppState>,
    private cartService: CartService,
    private voucherService:VoucherService,
    private router: Router,
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
    this.store.select('auth').subscribe((state)=>{
      this.userId= state.user.userId;
      // console.log(this.userId);
    })

    this.voucherService.canQuote(this.voucherId).subscribe((data:any)=>{
      // console.log(data);
      this.canQuote=data;
      // console.log(this.canQuote)
    });

  }

  quotePrice() {
    // console.log(this.canQuote);
    this.dialog.open(DialogComponent, {
      width:"50vh",
      data: {
        component: QuotePriceComponent,
        price: this.voucher.sellingPrice,
        voucherId: this.voucher.id
      },
    });
  }

  addToCart(id) {
    this.cartService.addItemToCart(id);
  };

  buy(id) {
    this.cartService.loadCheckout(this.voucher);
    this.cartService.setCartStatus(false);
    this.router.navigateByUrl('/checkout');
  }


  openLoginDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: LoginComponent,
      },
    });
  }

}
