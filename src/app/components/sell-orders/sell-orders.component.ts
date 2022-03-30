import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrdersService } from 'src/app/services/orders.service';
import * as fromApp from 'src/app/store/app.reducer'
@Component({
  selector: 'app-sell-orders',
  templateUrl: './sell-orders.component.html',
  styleUrls: ['./sell-orders.component.scss']
})
export class SellOrdersComponent implements OnInit {
  sellOrders=[];
  isLoading=false;
  displayedColumns: string[] = [
    'voucherId',
    'title',
    'brand',
    'expiryDate',
    'salePrice',
  ];
  constructor(private store:Store<fromApp.AppState>,private ordersService:OrdersService) { }

  ngOnInit(): void {
    this.ordersService.getAllSellOrders();
    this.store.select('myOrders').subscribe((state)=>{
      this.sellOrders=state.sellOrders;
      this.isLoading = state.isLoading;
    })
  }

}
