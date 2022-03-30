import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { SnackbarService } from './snackbar.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromWalletAction from 'src/app/store/walletStore/wallet.actions'


@Injectable({
  providedIn: 'root'
})
export class WalletService {
  url = environment.apiEndPoint;
  token='';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService
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

  getWallet(){
    const headers=this.getHeader();
    this.store.dispatch(new fromWalletAction.ChangeLoading(true))
    this.httpClient.get(this.url+'wallet',{headers}).subscribe((data:any)=>{
      // console.log("hi",data);
      this.store.dispatch(new fromWalletAction.UpdateWallet(data))
      this.store.dispatch(new fromWalletAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromWalletAction.ChangeLoading(false))
    })
  }
}
