import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { SnackbarService } from './snackbar.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromMyOrderAction from 'src/app/store/myOrdersStore/my-orders.actions';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  url = environment.apiEndPoint;
  token='';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,
    public dialog: MatDialog
  ) {
    this.store.select('auth').subscribe((state)=>{
      this.token=state.user.token;
    })
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers = headers.set('Authorization', 'Bearer ' + this.token);

    return headers;
  }

  getAllBuyOrders() {
    const headers=this.getHeader();
    this.store.dispatch(new fromMyOrderAction.ChangeLoading(true))
    this.httpClient.get(this.url+'users/buyOrders',{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromMyOrderAction.UpdateBuyOrders(data))
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    })
  }

  getAllSellOrders(){
    const headers=this.getHeader();
    this.store.dispatch(new fromMyOrderAction.ChangeLoading(true))
    this.httpClient.get(this.url+'user/myVouchers',{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromMyOrderAction.UpdateSellOrders(data))
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    })
  }

  reportOrder(body){
    const headers=this.getHeader()
    this.store.dispatch(new fromMyOrderAction.ChangeLoading(true))
    this.httpClient.post(this.url+'issue/submit',body,{headers}).subscribe((data:any)=>{
      // console.log(data);
      this.snackbarService.openSnackBar("Issue Reported, Admin Will Contact You Soon",'Ok')
      this.dialog.closeAll()
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromMyOrderAction.ChangeLoading(false))
    })
  }
}
