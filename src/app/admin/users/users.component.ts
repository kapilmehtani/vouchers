import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AdminVerifyService } from 'src/app/services/admin-verify.service';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users=[];
  isLoading=false;

  constructor(private store:Store<fromApp.AppState>,private adminService:AdminVerifyService) { }

  ngOnInit(): void {
    this.adminService.getActiveUsers();
    this.store.select('alluser').subscribe((state)=>{
      this.users=state.user;
      this.isLoading = state.isLoading;
    })
  }

  searchForm = new FormGroup({
    input: new FormControl(null),
  });

  searchVoucher() {
    if(!this.searchForm.value.input){
      this.adminService.getActiveUsers();
    }
    else {
      this.adminService.searchUser(this.searchForm.value.input);
    }
  }

}
