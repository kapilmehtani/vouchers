import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
// import { Verify } from 'crypto';
import { AuthService } from 'src/app/services/auth.service';
import { VoucherService } from 'src/app/services/voucher.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromAuthAction from 'src/app/store/authStore/auth.actions';
import { Profile } from 'src/app/store/authStore/auth.reducer';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  isLoading = false;
  userDetails: Profile = {
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    mobile: '',
    id: null,
    imageUrl: '',
    accountNumber: '',
    ifscCode: '',
    ssn: '',
    ssnVerified: false,
  };
  fileUpload = new FormGroup({
    fileSource: new FormControl(null)
  })
  showDetail=false
  pattern=/^(?!000)(?!666)(?!9)\d{3}[- ]?(?!00)\d{2}[- ]?(?!0000)\d{4}$/
  // pattern=/^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$/




  editForm: FormGroup
  bankForm: FormGroup
  verifySsn:FormGroup

  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
    private voucherService: VoucherService
  ) { }

  ngOnInit(): void {
    this.authService.getProfile();
    this.store.select('auth').subscribe((state) => {
      // console.log(state);
      this.userDetails = state.profile;
      this.editForm = new FormGroup({
        // address:new FormControl(this.userDetails.address,[Validators.required]),
        email: new FormControl(this.userDetails?.email, [
          Validators.required,
          Validators.email,
        ]),
        mobile: new FormControl(this.userDetails?.mobile, [
          Validators.required,
        ]),
        firstName: new FormControl(this.userDetails?.firstName, [
          Validators.required,
        ]),
        middleName: new FormControl(this.userDetails?.middleName, [
          ,
        ]),
        lastName: new FormControl(this.userDetails?.lastName, [
          Validators.required,
        ]),
        imgUrl: new FormControl(this.userDetails?.imageUrl),
      });
      this.bankForm = new FormGroup({
        accountNumber: new FormControl(this.userDetails?.accountNumber, [
          Validators.required,
        ]),
        ifscCode: new FormControl(this.userDetails?.ifscCode, [Validators.required]),
      });

      this.verifySsn= new FormGroup({
        ssn:new FormControl(this.userDetails?.ssn,[Validators.pattern(this.pattern)])
      })
      this.isLoading = state.isLoading;

    });
  }

  onProfileEdit() {
    // console.log('Edit');
    // console.log(this.editForm.value);
    this.authService.updateProfile(this.editForm.value);
  }
  onBankEdit() {
    // console.log('Bank');
    // console.log(this.bankForm.value);
    this.authService.updateProfile(this.bankForm.value);
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.uploadFile(file);
      this.fileUpload.patchValue({
        fileSource: file,
      });
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileUpload.get('fileSource').value);
    formData.append('upload_preset', 'aos8bajz');
    const upload = this.voucherService.uploadFile(formData).subscribe((data: any) => {
      // console.log(data.url);
      this.authService.updateProfile({ "imageUrl": data.url })
    });

  }

  submitKyc(){
    // console.log("in here");
    // console.log(this.verifySsn.value)
    this.authService.updateProfile(this.verifySsn.value);
  }
}
