import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { VoucherService } from 'src/app/services/voucher.service';
import { Order } from 'src/app/store/myOrdersStore/my-orders.reducer';
import { DialogComponent } from '../dialog/dialog.component';
import { ReportComponent } from '../report/report.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order:Order;
  @Input() isSellOrder;
  constructor(
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private voucherService:VoucherService
  ) { }

  ngOnInit(): void {
  }

  reportAnIssue() {
    this.dialog.open(DialogComponent, {
      width:"50vh",
      data: {
        component: ReportComponent,
        order: this.order,
        isSellOrder:this.isSellOrder
      },
    });
  }

  review(){
    this.dialog.open(DialogComponent, {
      width:"50vh",
      data: {
        component: ReviewComponent,
        order: this.order,
      },
    });
  }

}
