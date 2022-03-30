import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input('order') order
  @Input('isSellOrder') isSellOrder

  constructor(private orderService:OrdersService) { }

  reportForm:FormGroup

  ngOnInit(): void {
    // console.log(this.order);
    const orderItemId= this.order.orderItemId
    this.reportForm= new FormGroup({
      comment:new FormControl(null,Validators.required),
      orderItemId:new FormControl(orderItemId.toString(),Validators.required),
      // transactionId:new FormControl(,Validators.required)
    })
  }

  submitReport(){
    // console.log(this.reportForm.value);
    this.orderService.reportOrder(this.reportForm.value);
  }
}
