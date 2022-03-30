import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromVoucherAction from '../store/voucherStore/voucher.actions';
import * as fromGraphAction from '../store/graphStore/graph.actions';
import * as fromPieChartAction from '../store/piechartStore/piechart.actions';
import * as fromAllUsersAction from '../store/allUsersStore/allusers.actions';
import { map } from 'rxjs/operators';
import { Voucher } from '../store/voucherStore/voucher.reducer';
import { SnackbarService } from './snackbar.service';
import { User } from '../store/authStore/auth.reducer';
import { AllUser } from '../store/allUsersStore/allusers.reducer';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AdminVerifyService {
  url=environment.apiEndPoint;

  constructor(private httpClient:HttpClient,private store:Store<fromApp.AppState>,
    private snackBarService:SnackbarService,private router:Router) { }



  getAllUnverifiedVoucher(){
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.get(this.url+'vouchers/unverified').subscribe((data)=>{
      this.store.dispatch(new fromVoucherAction.UpdateUnverifiedVouchers(<Voucher[]>data))
      // console.log(data);
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    })

  }

  getAllUnverifiedUsers(){
    this.store.dispatch(new fromAllUsersAction.ChangeLoading(true));
    this.httpClient.get(this.url+'users/kycSubmitted').subscribe((data)=>{
      this.store.dispatch(new fromAllUsersAction.UpdateUnVerifiedUser(<AllUser[]>data))
      // console.log(data);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    })
  }

  verifyUser(body){
    this.store.dispatch(new fromAllUsersAction.ChangeLoading(true));
    this.httpClient.get(this.url+'users/'+body+'/verify').subscribe((data)=>{
      this.store.dispatch(new fromAllUsersAction.UpdateUnVerifiedUser(<AllUser[]>data))
      this.getAllUnverifiedUsers()
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    })
  }

  acceptVoucher(voucherId){
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.put(this.url+'vouchers/acceptVoucher/'+voucherId,{}).subscribe((data)=>{

      // console.log(data);
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      if (error.error.text=="Voucher verified"){
        this.getAllUnverifiedVoucher();
        this.snackBarService.openSnackBar("Voucher verified","Ok");
      }
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    })
  }

  rejectVoucher(voucherId){
    this.store.dispatch(new fromVoucherAction.ChangeLoading(true));
    this.httpClient.put(this.url+'vouchers/rejectVoucher/'+voucherId,{}).subscribe((data)=>{

      // console.log(data);
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      if (error.error.text=="Voucher rejected"){
        this.getAllUnverifiedVoucher();
        this.snackBarService.openSnackBar("Voucher rejected","Ok");
      }
      this.store.dispatch(new fromVoucherAction.ChangeLoading(false));
    })
  }

  getActiveUsers() {
    this.store.dispatch(new fromAllUsersAction.ChangeLoading(true));
    this.httpClient.get(this.url+'users').subscribe((data)=>{
      this.store.dispatch(new fromAllUsersAction.UpdateUser(<AllUser[]>data))
      // console.log(data);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    },error=>{
      console.log(error);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    })
  }

  deleteUser(user) {
    console.log(user);
    this.store.dispatch(new fromAllUsersAction.ChangeLoading(true))
    this.httpClient.post(this.url+'block-user',user).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false))
      this.snackBarService.openSnackBar("User Deleted","Ok");
      this.router.navigateByUrl("/admin/users")
    },error=>{
      console.log(error);
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false))
    })
  }

  searchUser(data) {
    console.log(data);
    this.store.dispatch(new fromAllUsersAction.ChangeLoading(true));
    this.httpClient.get(this.url + 'users/search/'+data).subscribe((data: any) => {
      // console.log(data);
      this.store.dispatch(new fromAllUsersAction.UpdateUser(<AllUser[]>data));
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    },
    (error) => {
      this.store.dispatch(new fromAllUsersAction.ChangeLoading(false));
    });
  }

  fetchGraphDataByMonth(body) {
    this.store.dispatch(new fromGraphAction.ChangeLoading(true))
    this.httpClient.post(this.url+'vouchers/graph',body).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromGraphAction.UpdateTransactionCount(data))
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))

    },error=>{
      console.log(error);
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))
    })
  }

  fetchGraphDataByYear(body) {
    this.store.dispatch(new fromGraphAction.ChangeLoading(true))
    this.httpClient.post(this.url+'vouchers/graph/month',body).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromGraphAction.UpdateTransactionCount(data))
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))

    },error=>{
      console.log(error);
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))
    })
  }

  fetchGraphDataYearWise(body) {
    this.store.dispatch(new fromGraphAction.ChangeLoading(true))
    this.httpClient.post(this.url+'vouchers/graph/year',body).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromGraphAction.UpdateTransactionCount(data))
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))

    },error=>{
      console.log(error);
      this.store.dispatch(new fromGraphAction.ChangeLoading(false))
    })
  }

  fetchPieGraphData(body) {
    this.store.dispatch(new fromPieChartAction.ChangeLoading(true))
    this.httpClient.post(this.url+'vouchers/pie',body).subscribe((data:any)=>{
      // console.log(data);
      this.store.dispatch(new fromPieChartAction.UpdateRevenue(data))
      this.store.dispatch(new fromPieChartAction.ChangeLoading(false))

    },error=>{
      console.log(error);
      this.store.dispatch(new fromPieChartAction.ChangeLoading(false))
    })
  }

  getUserTransaction(id) {
    return this.httpClient.get(this.url+'users/'+id+'/transactions');
  }

}
