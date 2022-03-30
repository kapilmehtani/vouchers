import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
//import { CartService } from 'src/app/services/cart.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromCartAction from 'src/app/store/cartStore/cart.action';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/services/wallet.service';
import { Wallet } from 'src/app/store/walletStore/wallet.reducer';
import { CartService } from 'src/app/services/cart.service';

declare var Razorpay:any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  cartVouchers=[];
  isLoading=false;
  voucherAmount=0;
  totalAmount=0;
  fee=0;
  points=0;
  walletDescription:Wallet;

  constructor(private store:Store<fromApp.AppState>,
    private cartService:CartService,
    private router: Router,
    private walletService:WalletService) { }

  ngOnInit(): void {
    this.walletService.getWallet();
    this.store.select('wallet').subscribe((state)=>{
      this.walletDescription=state.wallet
      // console.log(state);

      this.isLoading=state.isLoading
    })
    this.cartService.getCart();
    this.store.select('cart').subscribe((state)=>{
      this.cartVouchers=state.vouchers;
      this.isLoading = state.isLoading;
      this.calculateAmount();
    })
    // console.log(this.cartVouchers);

  }


  calculateAmount() {
    this.voucherAmount=0;
    this.cartVouchers.map((voucher) => {
      return (this.voucherAmount += voucher.sellingPrice);
    });
    this.fee=this.voucherAmount*.025;
    this.points=this.voucherAmount*.05;
    this.fee=Math.round((this.fee + Number.EPSILON) * 100) / 100;
    this.totalAmount=this.voucherAmount+this.fee;
    this.points=Math.ceil(this.points);
  }

  removeVoucher(id) {
    // console.log("id= ",id);
    // API for removing voucher from cart
    this.cartService.removeItemFromCart(id);
  }



  // payment(data) {
  //  var razorPayOptions = {
  //     "key": "rzp_test_ZonYASuqpUcwbh",
  //     "amount": this.totalAmount*100,
  //     "currency": "INR",
  //     "name": "Voucher Money",
  //     "description": "Test Transaction",
  //     // "order_id": "order_9A33XWu170gUtm",
  //     "handler": (res) => {
  //       console.log(res);
  //     },
  //     "notes": {
  //         "address": "Voucher Money Office"
  //     },
  //     "theme": {
  //         "color": "#3399cc"
  //     }
  //   }
  //   console.log(data);
  //   razorPayOptions.handler = this.razHand
  //   var rzp1 = new Razorpay(razorPayOptions);
  //   rzp1.open();
  // }

  // razHand(response) {
  //   console.log(response);
  // }

  Pay() {
    console.log("Checkout")
    this.cartService.loadCheckout(this.cartVouchers);
    this.cartService.setCartStatus(true);
    this.router.navigateByUrl('/checkout');
    // this.cartService.checkoutCart().subscribe((data:any)=>{
    //   this.payment(data);
    // },error=>{
    //   console.log(error);
    // });
    // Razorpay api
  }

}
