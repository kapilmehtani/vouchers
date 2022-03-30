import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Input() email
  isLoading=false;

  constructor(private authService:AuthService,public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  resetForm= new FormGroup({
    email:new FormControl("null"),
    otp:new FormControl(null,[Validators.required]),
    newPassword:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9@_]*')]),
    newPassword2:new FormControl(null,[Validators.required,Validators.minLength(6),Validators.pattern('[a-zA-Z0-9@_]*'),passwordValidation])
  });

  resetPassword(){
    this.resetForm.value.email=this.email
    // console.log(this.resetForm.value);
    // console.log(this.resetForm)
    // this.authService.resetPassword(this.resetForm.value);
    // this.dialog.open(DialogComponent, {
    //   data: {
    //     component: LoginComponent
    //   }
    // });
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

// function passwordValidation(group: AbstractControl): {[key:string]: any} | null {
//   const pass  = group.get('newPassword');
//   const rePass  = group.get('newPassword2');
//   if( pass.value === rePass.value ) {
//     return null;
//   } else {
//     return { 'invalidPassword' : true};
//   }
// }
