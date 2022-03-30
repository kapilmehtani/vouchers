import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer'
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SignupComponent } from '../signup/signup.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component'
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading=false;
  constructor(private authService:AuthService,private store:Store<fromApp.AppState>,private router:Router,
    public dialog: MatDialog,private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    // this.store.select('auth').subscribe((state)=>{
    //   if (state.user.token){
    //     this.dialog.closeAll();
    //   }
    // })

    this.socialAuthService.authState.subscribe((user) => {
      // this.socialUser = user;
      // this.isLoggedin = (user != null);
      // console.log("user",user);
      if(user){
      this.authService.googleSignIn(user);
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginForm= new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9@_]*')])
  })

  onLogin(){
    // console.log(this.loginForm.value);
    this.authService.signIn(this.loginForm.value);
  }

  openSignupDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        component: SignupComponent
      }
    });
  }

  openForgotPasswordDialog() {

    if(this.loginForm.value.email===null)
    {
      window.alert("Please enter email");
    }
    else{
      //API call for resetPassword OTP
      var email=this.loginForm.value
      // console.log(email);
      this.authService.forgotPassword(email);
      this.dialog.open(DialogComponent, {
        data: {
          component: ResetPasswordComponent,
          email: this.loginForm.value.email
        },
      });
    }
  }
}
