import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { OrdersService } from 'src/app/services/orders.service';
import * as fromApp from 'src/app/store/app.reducer'
import { Voucher } from 'src/app/store/voucherStore/voucher.reducer';
import { DialogComponent } from '../dialog/dialog.component';
import { ReportComponent } from '../report/report.component';
import { ReviewComponent } from '../review/review.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-buy-orders',
  templateUrl: './buy-orders.component.html',
  styleUrls: ['./buy-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class BuyOrdersComponent implements OnInit {
  buyOrders=[];
  isLoading=false;
  displayedColumns: string[] = [
    'orderId',
    'orderItemId',
    'transactionId',
    'orderDate',
    'orderPrice',
    'rate',
    'report'
  ];
  expandedElement: Voucher | null;

  constructor(private store:Store<fromApp.AppState>,private ordersService:OrdersService,
    public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.ordersService.getAllBuyOrders();
    this.store.select('myOrders').subscribe((state)=>{
      // console.log(state.buyOrders);

      this.buyOrders=state.buyOrders;
      this.isLoading = state.isLoading;
    })
  }

  reportAnIssue(order) {
    this.dialog.open(DialogComponent, {
      width:"50vh",
      data: {
        component: ReportComponent,
        order: order,
      },
    });
  }

  review(order){
    this.dialog.open(DialogComponent, {
      width:"50vh",
      data: {
        component: ReviewComponent,
        order: order
      },
    });
  }

}
