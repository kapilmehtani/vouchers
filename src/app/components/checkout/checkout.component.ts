import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CartService } from 'src/app/services/cart.service';
import { WalletService } from 'src/app/services/wallet.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Wallet } from 'src/app/store/walletStore/wallet.reducer';

declare var Razorpay:any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  buyVouchers : any;
  isLoading=true;
  voucherAmount=0;
  totalAmount=0;
  fee=0;
  points=0;
  existPoints=0;
  redeemAmt=0;
  isCart=false;
  orderId :any;
  transactionId:'';
  isChecked = false;
  coinUsed = 0;
  initialAmt = 0;
  discount=0;

  redeemForm = new FormGroup({
    redeem: new FormControl(null)
  });


  constructor(private cartService:CartService,private walletService:WalletService,
    private store:Store<fromApp.AppState>,private router:Router) { }

  ngOnInit(): void {

    this.buyVouchers = this.cartService.getCheckout();
    this.isCart = this.cartService.getCartStatus();
    if(!this.isCart) {
      // console.log(this.buyVouchers);
    }
    // console.log(this.buyVouchers);
    // console.log(this.buyVouchers.length);
    // console.log(this.isCart);
    this.isLoading=true;
    this.calculateAmount();

  }

  calculateAmount() {
    this.voucherAmount=0;
    if(this.isCart){

      // checkout of cart, get initial amt
      this.cartService.getCartAmount().subscribe((data:any)=>{
        // console.log(data);
        this.isLoading=false;
        this.voucherAmount = data.itemsValue;
        this.fee = data.taxCalculated;
        this.points = data.loyaltyCoinsEarned;
        this.totalAmount = data.finalCost;
        this.existPoints=data.loyaltyCoinsInWallet;
        this.redeemAmt=data.finalCost;
        this.initialAmt = this.totalAmount;
      });
    }
    else if(!this.isCart){

      // console.log(this.voucherAmount);
      // checkout of voucher, get initial amt
      this.cartService.getVoucherAmount(this.buyVouchers.id).subscribe((data:any)=>{
        // console.log(data);
        this.isLoading=false;
        this.voucherAmount = data.itemsValue;
        this.fee = data.taxCalculated;
        this.points = data.loyaltyCoinsEarned;
        this.totalAmount = data.finalCost;
        this.existPoints=data.loyaltyCoinsInWallet;
        this.redeemAmt=data.finalCost;
        this.initialAmt = this.totalAmount;
      });
    }
    // console.log(this.isLoading);
  }

   payment() {
    var razorPayOptions = {
       "key": "rzp_test_739cyzNZMGyUcF",
       "amount": this.totalAmount*100,
       "currency": "USD",
       "name": "Voucher Money",
       "description": "Test Transaction",
       "order_id": this.orderId,
       "handler": (res) => {
        //  console.log(res);
        //  console.log(this.orderId);
        //  console.log("in handler");
         this.transactionId=res.razorpay_payment_id
         if(this.isCart){
          this.cartService.checkoutCart(this.coinUsed,this.totalAmount,this.transactionId);
         }else {
          this.cartService.checkoutBuy(this.coinUsed,this.totalAmount,this.buyVouchers.id,this.transactionId);
         }
       },
       "notes": {
           "address": "Voucher Money Office"
       },
       "theme": {
           "color": "#3399cc"
       }
     }

     var rzp1 = new Razorpay(razorPayOptions);
     rzp1.open();
   }

   decrementQuantity() {
    this.coinUsed -=1
    this.discount -=0.5;
    this.redeemAmt = this.redeemAmt + .5;
    this.redeemAmt = Math.round((this.redeemAmt + Number.EPSILON) * 100) / 100;
   }

   incrementQuantity() {
    this.coinUsed +=1
    this.discount +=0.5;
    this.redeemAmt = this.redeemAmt - .5
    this.redeemAmt = Math.round((this.redeemAmt + Number.EPSILON) * 100) / 100;
   }

   async Pay() {
     if(this.isChecked)
     {
       this.totalAmount=this.redeemAmt;
     }
     else {
       this.coinUsed = 0;
       this.totalAmount = this.initialAmt;
       this.discount = 0;
     }
     console.log(this.totalAmount);
     console.log(this.isChecked)
     console.log(this.coinUsed)
     if(this.isCart){
      //  console.log("cart items")
       //Get cart amt after coins has been redeemed
       this.cartService.getFinalCartAmount(this.coinUsed).subscribe((data:any)=>{
        // console.log(data);
        this.totalAmount = data.finalCostAfterCoinRedeem;
      },error=>{
        console.log(error);
      });
       //Send no of coins redeemed instead of ischecked
      await this.cartService.getCartOrderId(this.coinUsed).subscribe((data:any)=>{
        // console.log(data)
        this.orderId=data;
        // console.log(this.orderId);
      },error=>{
        console.log(error);
      });
      await this.payment();

     }
     else{
      console.log("direct item")
      //Get voucher amt after coins has been redeemed
      this.cartService.getFinalBuyAmount(this.coinUsed,this.buyVouchers.id).subscribe((data:any)=>{
        // console.log(data);
        this.totalAmount = data.finalCostAfterCoinRedeem;
      },error=>{
        console.log(error);
      });
      //Send no of coins redeemed instead of ischecked
      await this.cartService.getBuyOrderId(this.coinUsed,this.buyVouchers.id).subscribe((data:any)=>{
        // console.log(data)
        this.orderId=data;
        // console.log(this.orderId);
      },error=>{
        console.log(error);
      });
      await this.payment();
     }

  }

}
