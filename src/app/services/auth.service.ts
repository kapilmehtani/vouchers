import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { environment } from 'src/environments/environment';
import * as fromAuthAction from '../store/authStore/auth.actions';
import { SnackbarService } from './snackbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from '../store/authStore/auth.reducer';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { NotificationService } from './notification.service';
import { SocialAuthService } from 'angularx-social-login';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiEndPoint;
  token='';
  Message:'';
  error:'';

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private snackbarService: SnackbarService,
    public dialog: MatDialog,
    private router:Router,
    private cartService:CartService,
    private notificationService:NotificationService,
    private socialAuthService: SocialAuthService
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

  signUp(body) {
    // console.log(body);
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'signup', body).subscribe(
      (data: {Message}) => {
        // console.log(data);
        console.log(data.Message);
        if(data.Message==='User with this email Id already exists!!!')
        {
          this.snackbarService.openSnackBar('User already exists', 'Ok');
          this.dialog.closeAll();
        }
        else{
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.snackbarService.openSnackBar('Verify OTP', 'Ok');
        }
      },
      (error) => {
        console.log(error)
        alert(error.error.error);
      }
    );
  }

  verifyOtp(body) {
    // console.log(body);
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.patch(this.url + 'otpVerify', body).subscribe(
      (data: { message }) => {
        if(data.message==="Incorrect OTP")
        {
          // this.store.dispatch(new fromAuthAction.ChangeLoading(true));
          this.snackbarService.openSnackBar('OTP is Incorrect', 'Ok');
          this.dialog.closeAll();
        }
        else{
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.snackbarService.openSnackBar('OTP Verified', 'Ok');
        }

      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  signIn(body) {
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'login', body).subscribe(
      (data: { error:string,token:string,isAdmin:string,userId:string }) => {
        // console.log(data);
        console.log(data.error)
        if (data.token) {
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.store.dispatch(new fromAuthAction.Login({ token: data.token,userId:data.userId }));
          this.notificationService.getNotification();
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          //add a call to fetch the cart detials here
          this.snackbarService.openSnackBar('Sign In Succesful', 'Ok');
          this.cartService.getCart();
          this.dialog.closeAll();
        }
        if (data.isAdmin=="true"){
          this.router.navigateByUrl("/admin");
        }
        if(data.error=='User is blocked!!!'){
          this.snackbarService.openSnackBar('Your account has been blocked.Please contact us at vouchermoneycontactus@gmail.com.', 'Ok');
        }
        if(data.error=='This user Email is not verified'){
          this.snackbarService.openSnackBar('Your email is not verified. Please click on forgot password to verify your account', 'Ok');
        }
      },
      (error) => {
        console.log(error);
        // alert(error.error.error);
        this.snackbarService.openSnackBar('Invalid Credentials', 'Ok');
      }
    );
  }


  googleSignIn(body) {
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.post(this.url + 'gAuth', body).subscribe(
      (data: { token:string,isAdmin:string,userId:string }) => {
        // console.log(data);

        if (data.token) {
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.store.dispatch(new fromAuthAction.Login({ token: data.token ,userId:data.userId}));
          this.notificationService.getNotification();
          localStorage.setItem('token', data.token);
          localStorage.setItem('userId', data.userId);
          //add a call to fetch the cart detials here
          this.snackbarService.openSnackBar('Sign In Succesful', 'Ok');
          this.cartService.getCart();
          this.dialog.closeAll();
        }
        if (data.isAdmin=="true"){
          this.router.navigateByUrl("/admin");
        }
      },
      (error) => {
        console.log(error);
        // alert(error.error.error);
      }
    );
  }

  forgotPassword(body) {
    console.log("body=",body);
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.patch(this.url + 'forgotPasswordReq', body).subscribe(
      (data) => {
        // console.log(data);
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.snackbarService.openSnackBar('OTP sent', 'Ok');
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  resetPassword(body) {
    console.log("body=",body);
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.patch(this.url + 'updatePassword', body).subscribe(
      (data: { error }) => {
        // console.log(data);
        // console.log(data.message);
        console.log(data.error)
        if(data.error==="Incorrect Otp!!! Try again.")
        {
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.snackbarService.openSnackBar('OTP is Incorrect', 'Ok');
          this.dialog.closeAll();
        }
        else{
          this.store.dispatch(new fromAuthAction.ChangeLoading(false));
          this.snackbarService.openSnackBar('Password changed Successfully', 'Ok');
        }
      },
      (error) => {
        alert(error.error.error);
      }
    );
  }

  logout(){
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.store.dispatch(new fromAuthAction.Logout());
    this.socialAuthService.signOut();
    localStorage.removeItem('token');
    this.snackbarService.openSnackBar('Sign Out Succesful', 'Ok');
    this.router.navigateByUrl("/home")
    this.store.dispatch(new fromAuthAction.ChangeLoading(false));
  }

  getProfile() {
    const headers=this.getHeader();
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.get(this.url + 'profile',{headers}).subscribe((data:any)=>{
      this.store.dispatch(new fromAuthAction.UpdateProfile(<Profile>data));
      this.store.dispatch(new fromAuthAction.ChangeLoading(false))
    },error=>{
      console.log(error);
    });
  }

  updateProfile(body){
    // console.log("here",body);

    const headers=this.getHeader();
    this.store.dispatch(new fromAuthAction.ChangeLoading(true));
    this.httpClient.put(this.url+'user/update',body,{headers}).subscribe((data:any)=>{
      this.snackbarService.openSnackBar("Profile Updated Successfully","Ok")
      this.getProfile();
      this.store.dispatch(new fromAuthAction.ChangeLoading(false))
    },error=>{
      console.log(error);
    });
  }
}
