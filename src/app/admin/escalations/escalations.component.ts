import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IssuesService } from 'src/app/services/issues.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromIssuesAction from 'src/app/store/issuesStore/issues.actions';
import { Issue } from 'src/app/store/issuesStore/issues.reducer';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-escalations',
  templateUrl: './escalations.component.html',
  styleUrls: ['./escalations.component.scss']
})
export class EscalationsComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef;
  issues: Issue[];
  isLoading = false;
  displayedColumns: string[] = [
    'issueId',
    'createdOn',
    'transactionId',
    'voucherId',
    'comments',
    'userId',
    'action',
    'chat'
  ];

  constructor(private issuesService: IssuesService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.issuesService.getIssues();
    this.store.select('issue').subscribe((state) => {
      this.issues = state.issues
      // console.log("issues",state.issues);
      // this.issues.sort((issue) => {
      //   return issue.createdDate.getTime();
      // });
      this.isLoading = state.isLoading
    })
  }

  calculateExpiryDays(date) {
    let expiryDate = new Date(date);
    let today = new Date();
    var Difference_In_Time = today.getTime() - expiryDate.getTime();
    var Difference_In_Hours = Difference_In_Time / (1000 * 3600);

    return (48-<number><unknown>Difference_In_Hours.toFixed(0));
  }

  closeIssue(issueId) {
    // console.log("here inside the body");

    this.issuesService.closeIssue(issueId);
  }

  deleteIssue(issueId) {

  }

  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  /* save to file */
  XLSX.writeFile(wb, 'Escalations.xlsx');

}

  markAsReadIssue(issueId) {
    // console.log("here inside the body");
    this.issuesService.markAsRead(issueId);
  }


}
