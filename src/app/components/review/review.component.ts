import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RatingService } from 'src/app/services/rating.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() order: any
  reviewForm:FormGroup
  isLoading=false;
  constructor(private ratingService:RatingService) { }

  ngOnInit(): void {
    this.reviewForm= new FormGroup({
      comment:new FormControl(null,Validators.required),
      voucherId:new FormControl(this.order.voucher.id,Validators.required),
      sellerId:new FormControl(this.order.voucher.seller.id,Validators.required),
      stars:new FormControl(0,Validators.required)
    })
    this.ratingService.isLoading.subscribe((state)=>{this.isLoading=state})
  }

  submitReview(){
    // console.log(this.reviewForm.value);
    this.ratingService.reportOrder(this.reviewForm.value);
  }

}
