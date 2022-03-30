import { Component, OnInit } from '@angular/core';
import { AdminVerifyService } from 'src/app/services/admin-verify.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { User } from 'src/app/store/authStore/auth.reducer';
import { AllUser } from 'src/app/store/allUsersStore/allusers.reducer';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.scss']
})
export class VerifyUserComponent implements OnInit {

  kycSubmitted: AllUser[];
  isLoading = false;
  displayedColumns: string[] = [
    'email',
    'name',
    // 'bankAccount',
    // 'ifsc',
    'ssn',
    'action',
  ];

  constructor(private adminVerifyService:AdminVerifyService,private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.adminVerifyService.getAllUnverifiedUsers();
    this.store.select('alluser').subscribe((state) => {
      this.kycSubmitted = state.unverifiedUser
      // console.log(state.unverifiedUser);
      this.isLoading = state.isLoading
    })
  }

  verifyUser(id){
    // console.log(id);
    this.adminVerifyService.verifyUser(id)
  }

}
