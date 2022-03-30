import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VoucherService } from 'src/app/services/voucher.service';

@Component({
  selector: 'app-quote-price',
  templateUrl: './quote-price.component.html',
  styleUrls: ['./quote-price.component.scss']
})
export class QuotePriceComponent implements OnInit {

  @Input() price
  @Input() voucherId

  quoteForm:any;


  constructor(private voucherService:VoucherService) { }

  ngOnInit(): void {
    // console.log("try",this.voucherId);
    this.quoteForm= new FormGroup({
      quotedPrice:new FormControl(null,[Validators.required,Validators.max(this.price)]),
      voucherId:new FormControl(null)
    });
  }

  quotePrice(){
    this.quoteForm.value.voucherId=this.voucherId
    this.voucherService.quotePrice(this.quoteForm.value);
  }

}

