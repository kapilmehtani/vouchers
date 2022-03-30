import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  tranId = '';
  date:any;
  amt=0;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.tranId=this.cartService.transactionId;
    // this.tranId="pay_HW194kKuJqaV0F";
    let dt = new Date();
    this.date=dt.toLocaleString();
    // console.log(this.tranId);
    this.amt=this.cartService.finalAmt;

  }

}
