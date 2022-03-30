import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogComponent } from '../dialog/dialog.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  constructor(private authService:AuthService,public dialog: MatDialog) { }

  @Input() email
  ngOnInit(): void {
  }

  otpForm= new FormGroup({
    email:new FormControl(null),
    otp:new FormControl(null,[Validators.required]),
  });

  verifyOtp(){
    this.otpForm.value.email=this.email
    this.authService.verifyOtp(this.otpForm.value);
    this.dialog.open(DialogComponent, {
      data: {
        component: LoginComponent
      }
    });
  }

}
