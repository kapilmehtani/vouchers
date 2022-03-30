import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { SnackbarService } from './snackbar.service';
import * as fromApp from 'src/app/store/app.reducer';

import { environment } from 'src/environments/environment';

import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RatingService {
  url = environment.apiEndPoint;
  sellerRating: BehaviorSubject<any> = new BehaviorSubject<any>({});
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  token='';
  constructor(private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store<fromApp.AppState>,
    public dialog: MatDialog) {
      this.store.select('auth').subscribe((state)=>{
        this.token=state.user.token;
      })
     }


    getHeader() {
      let headers = new HttpHeaders();
      headers = headers = headers.set('Authorization', 'Bearer ' + this.token);

      return headers;
    }

    getRatingById(userId) {

      this.httpClient.get(this.url+'rating/get/'+userId).subscribe((data:any)=>{
        // console.log(data);
        this.sellerRating.next(data);
      },error=>{
        console.log(error);

      })
    }


    reportOrder(body){
      const headers=this.getHeader()
      this.isLoading.next(true);
      this.httpClient.post(this.url+'rating/post',body,{headers}).subscribe((data:any)=>{
        // console.log(data);
        this.isLoading.next(false);
        if(data.status=404){
          this.snackbarService.openSnackBar(data.message,'Ok')
        }
        else{
          this.snackbarService.openSnackBar("Review Submitted",'Ok')
        }

        this.dialog.closeAll()

      },error=>{
        console.log(error);
        this.isLoading.next(false);
      })
    }
}
