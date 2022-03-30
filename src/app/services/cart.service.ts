import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { SnackbarService } from './snackbar.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromCartAction from 'src/app/store/cartStore/cart.action';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  url = environment.apiEndPoint;
  token = '';
  vouchers : any;
  isCart : false;
  public transactionId = '';
  public finalAmt = 0;

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,
    private router:Router,
    private zone: NgZone
  ) {
    this.store.select('auth').subscribe((state) => {
      this.token = state.user.token;
    });
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers = headers.set('Authorization', 'Bearer ' + this.token);

    return headers;
  }

  getCart(){
    const headers=this.getHeader();
    this.store.dispatch(new fromCartAction.ChangeLoading(true))
    this.httpClient.get(this.url+'cart/items',{headers}).subscribe((data:any)=>{
      this.store.dispatch(new fromCartAction.UpdateCart(data))
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    })

  }

  addItemToCart(id:number){
    const headers=this.getHeader();
    this.store.dispatch(new fromCartAction.ChangeLoading(true))
    this.httpClient.post(this.url+'cart/addItem/'+id,{},{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.getCart();
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    })

  }

  removeItemFromCart(id:number){
    const headers=this.getHeader();
    this.store.dispatch(new fromCartAction.ChangeLoading(true))
    this.httpClient.delete(this.url+'cart/removeItem/'+id,{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
      this.getCart();
    },error=>{
      console.log(error);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    })
  }

  //Get cart amt after coins has been redeemed
  getFinalCartAmount(redeem){
    const headers=this.getHeader();
    // console.log(redeem)
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    return this.httpClient.get(this.url+'payment/get/cart-order/'+redeem,{headers});
  }

  //Get order Id for cart
  getCartOrderId(redeem){
    const headers=this.getHeader();
    let data = {
      redeemedCoins:redeem
    }
    // console.log(data)
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    return this.httpClient.post(this.url+'payment/create/cart-order',{data},{headers});
  }

  //After transaction Id is obtained for cart i.e payment is done
  checkoutCart(redeem,amt,tranId){
    // console.log(tranId);
    const headers=this.getHeader();
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    this.httpClient.get(this.url+'cart/checkout/'+tranId+'/'+redeem,{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
      this.getCart();
      this.zone.run(() => {
        this.transactionId=tranId;
        this.finalAmt=amt;
        this.router.navigateByUrl("/payment-success")
      });
    },error=>{
      console.log(error);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    })
  }

  //Get cart amt after coins has been redeemed
  getFinalBuyAmount(redeem,id){
    const headers=this.getHeader();
    // console.log(redeem+' id = '+id);
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    return this.httpClient.get(this.url+'payment/get/voucher-order/'+id+'/redeem/'+redeem,{headers});
  }

  //Get order Id for voucher
  getBuyOrderId(redeem,id){
    // console.log(id);
    const headers=this.getHeader();
    let data = {
      redeemedCoins:redeem
    }
    console.log(data)
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    return this.httpClient.post(this.url+'payment/create/voucher-order/'+id,{data},{headers});
  }

  //After transaction Id is obtained for voucher i.e payment is done
  checkoutBuy(redeem,amt,vouId,tranId){
    // console.log(vouId+" "+tranId);
    const headers=this.getHeader();
    this.store.dispatch(new fromCartAction.ChangeLoading(false))
    this.httpClient.post(this.url+'buy/voucher/'+vouId+'/'+tranId+'/'+redeem,{},{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
      this.getCart();
      this.zone.run(() => {
        this.transactionId=tranId;
        this.finalAmt=amt;
        this.router.navigateByUrl("/payment-success")
      });
      // this.router.navigateByUrl("/payment-success")
    },error=>{
      console.log(error);
      this.store.dispatch(new fromCartAction.ChangeLoading(false))
    })

  }

  //Get checkout details to display for cart
  getCartAmount() {
    const headers=this.getHeader();
    return this.httpClient.get(this.url+'payment/get/cart-order/',{headers})
  }

  //Get checkout details to display for voucher
  getVoucherAmount(data) {
    const headers=this.getHeader();
    return this.httpClient.get(this.url+'payment/get/voucher-order/'+data,{headers})
  }

  getCheckout() {
    return this.vouchers;
  }

  loadCheckout(data) {
    this.vouchers = data;
  }

  getCartStatus() {
    return this.isCart;
  }

  setCartStatus(data) {
    this.isCart = data;
  }
}
