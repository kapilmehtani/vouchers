import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromVoucherAction from '../store/voucherStore/voucher.actions';
import { map } from 'rxjs/operators';
import { Voucher } from '../store/voucherStore/voucher.reducer';
import { SnackbarService } from './snackbar.service';
import { MatDialog } from '@angular/material/dialog';
@Injectable({
  providedIn: 'root',
})
export class VoucherService {
  url = environment.apiEndPoint;
  token='';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,public dialog:MatDialog
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


  uploadFile(file: FormData) {
    return this.httpClient.post('https://api.cloudinary.com/v1_1/dai8grjze/image/upload', file);
  }

  searchVoucher(body) {
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'search-voucher', body).subscribe(
      (data: any) => {
        // console.log(data);

        this.store.dispatch(
          new fromVoucherAction.UpdateVerifiedVouchers(<Voucher[]>data)
        );
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      },
      (error) => {
        this.snackbarService.openSnackBar(error, 'Ok');
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      }
    );
  }

  addNewVoucher(body) {
    const headers=this.getHeader();
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'vouchers/new', body,{headers}).subscribe(
      (data:any) => {
        // console.log(data);
        if(data.status==409){
          this.snackbarService.openSnackBar(data.message,"Ok")
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
        }
        else{
        this.snackbarService.openSnackBar('Voucher Created successfully , Portal will verify it.','Ok');
        this.dialog.closeAll()
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
        this.getVerifiedVoucher();
        }

      },
      (err) => {
        this.snackbarService.openSnackBar(JSON.stringify(err), 'Ok');

        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      }
    );
  }

  getVerifiedVoucher() {
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.get(this.url + 'vouchers/verified').subscribe(
      (data) => {
        this.store.dispatch(
          new fromVoucherAction.UpdateVerifiedVouchers(<Voucher[]>data)
        );
        // console.log(data);
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      }
    );
  }

  getFilteredVouchers(body: { categories: any[]; companies: any[]; }){

    let newBody=JSON.parse(JSON.stringify(body))
    if(body.categories.length==0){
      delete newBody.categories
    }
    if(body.companies.length==0){
      delete newBody.companies
    }
    // console.log(newBody);

    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'filter',newBody).subscribe(
      (data) => {
        this.store.dispatch(
          new fromVoucherAction.UpdateVerifiedVouchers(<Voucher[]>data)
        );
        // console.log(data);
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      },
      (error) => {
        console.log(error);
        this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
      }
    );
  }

  quotePrice(body) {
    const headers=this.getHeader();
    this.httpClient.post(this.url + 'quote', body,{headers}).subscribe(
      (data) => {
        // console.log(data);
        this.snackbarService.openSnackBar('Your Price has been Quoted','Ok');
        this.dialog.closeAll()
      },
      (err) => {
        console.log(err, 'Ok');
      }
    );
  }
  getVoucherById() {}

  canQuote(id) {
    const headers=this.getHeader();
    return this.httpClient.get(this.url + 'can-quote/'+id,{headers});
  }
}
