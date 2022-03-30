import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromNotificationAction from '../store/notificationStore/notification.actions';
import { map } from 'rxjs/operators';
import { Voucher } from '../store/voucherStore/voucher.reducer';
import { SnackbarService } from './snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Notification } from '../store/notificationStore/notification.reducer';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  url = environment.apiEndPoint;
  token='';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,
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


  getNotification() {
    let headers= this.getHeader();
    this.store.dispatch(new fromNotificationAction.ChangeLoading(true));
    this.httpClient.get(this.url + 'getNotifications',{headers}).subscribe(
      (data) => {
        // console.log(data);

        this.store.dispatch(
          new fromNotificationAction.UpdateNotifications(<Notification[]>data)
        );
        // console.log(data);
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      }
    );
  }

  acceptQuotedPrice(voucherId,buyerId) {
    let headers= this.getHeader();
    this.store.dispatch(new fromNotificationAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'quote/accept',{voucherId:voucherId,buyerId:buyerId},{headers}).subscribe(
      (data) => {
        // console.log(data);
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      }
    );
  }

  rejectQuotedPrice(voucherId,buyerId) {
    let headers= this.getHeader();
    this.store.dispatch(new fromNotificationAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'quote/reject',{voucherId:voucherId,buyerId:buyerId},{headers}).subscribe(
      (data:any) => {
        // console.log(data);
        this.snackbarService.openSnackBar(data.message,"OK");
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      }
    );
  }

  changeNotificationSeen(notificationId){
    let headers= this.getHeader();
    // this.store.dispatch(new fromNotificationAction.ChangeLoading(true));
    this.httpClient.put(this.url + 'notification/' + notificationId +'/is-seen',{seen:true}).subscribe(
      (data) => {
        // console.log(data);
        // this.getNotification();
        // this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        // this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      }
    );
  }

  changeIsComplete(notificationId){
    let headers= this.getHeader();
    // this.store.dispatch(new fromNotificationAction.ChangeLoading(true));
    this.httpClient.put(this.url + 'notification/' + notificationId +'/is-complete',{completed:true}).subscribe(
      (data) => {
        this.getNotification();
        // console.log(data);
        // this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        // this.store.dispatch(new fromNotificationAction.ChangeLoading(false));
      }
    );
  }

}
