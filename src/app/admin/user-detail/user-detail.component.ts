import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AdminVerifyService } from 'src/app/services/admin-verify.service';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class UserDetailComponent implements OnInit {

  userId: number;
  isLoading = false;
  user : any;
  transactions : any
  displayedColumns: string[] = [
    'createdOn',
    'transactionId',
    'orderId',
    'userType',
    'credit',
    'debit',
    'status'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store:Store<fromApp.AppState>,
    private adminService:AdminVerifyService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = params?.id;
    });
    this.store.select('alluser').subscribe((state) => {
      if (this.userId) {
        state.user.forEach((user) => {
          if (this.userId == user.id) this.user = user;
        });
      }
      this.isLoading = state.isLoading;
      // console.log(this.user);
      // console.log(this.userId);
    });
    this.adminService.getUserTransaction(this.userId).subscribe((data:any)=>{
      // console.log(data);
      this.transactions=data;
    });
    // console.log(this.transactions);
  }

  delete() {
    let userDetail = {
      id:this.user.id,
      email:this.user.email,
      description:'Your account has been deleted'
    }

    this.adminService.deleteUser(userDetail);
  }

  transaction() {
    // console.log('trans');
    var element = document.getElementById("myTran");
    element.classList.toggle("active");
  }

  // ExportTOExcel()
  // {
  //   console.log('export excel');
  //   const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  //   /* save to file */
  //   XLSX.writeFile(wb, 'Escalations.xlsx');

  // }

}
