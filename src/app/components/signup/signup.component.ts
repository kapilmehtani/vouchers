import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent } from '../login/login.component';
import { OtpComponent } from '../otp/otp.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private authService:AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  signupForm= new FormGroup({
    firstName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.pattern('[a-zA-Z]*')]),
    middleName:new FormControl(null),
    lastName:new FormControl(null,[Validators.required]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    mobile:new FormControl(null,[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    password:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9@_]*')]),
    rePassword:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9@_]*'),passwordValidation])
  }
  );

  get f() { return this.signupForm.controls; }

  onSignup(){
    console.log(this.signupForm.value);

    const { value: password } = this.signupForm.get('password');
    const { value: confirmPassword } = this.signupForm.get('rePassword');
    if(password == confirmPassword){
      console.log("here");
      this.authService.signUp(this.signupForm.value);
      // this.authService.signUp(testbody)
      delay(2000);
      this.dialog.open(DialogComponent, {
        data: {
          component: OtpComponent,
          email: this.signupForm.value.email
        }
      });
    }

  }

  openLoginDialog() {
    this.dialog.closeAll();
    this.dialog.open(DialogComponent, {
      data: {
        component: LoginComponent
      }
    });
  }

}

function passwordValidation(control: AbstractControl): {[key:string]: any} | null {
    const repass : string = control.value;
    if(repass === "password") {
      return null;
    } else {
      return { 'invalidPassword' : true};
    }
}

// function passwordValidation() {
//   return (control: AbstractControl): {[key:string]: any} | null =>{
//     const repass : string = control.value;
//     if(repass === password) {
//       return null;
//     } else {
//       return { 'invalidPassword' : true};
//     }
//   };
// }
