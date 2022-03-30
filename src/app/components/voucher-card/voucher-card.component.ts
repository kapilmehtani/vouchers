import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-voucher-card',
  templateUrl: './voucher-card.component.html',
  styleUrls: ['./voucher-card.component.scss']
})
export class VoucherCardComponent implements OnInit {
  @Input() voucher;


  constructor(private cartService:CartService,private router: Router) { }

  ngOnInit(): void {
  }

  buyVoucher() {
    this.cartService.loadCheckout(this.voucher);
    this.cartService.setCartStatus(false);
    this.router.navigateByUrl('/checkout');
  }

  calculateExpiryDays(date){
    date=date.replace(' ', 'T')
    let expiryDate=new Date(date);
    let today = new Date();
    var Difference_In_Time =expiryDate.getTime() - today.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    // console.log(date);

    return Difference_In_Days.toFixed(0);
  }

}
