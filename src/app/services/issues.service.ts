import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromIssuesAction from 'src/app/store/issuesStore/issues.actions';
import { Chat, Issue } from '../store/issuesStore/issues.reducer';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  url = environment.apiEndPoint;
  token = '';

  constructor(
    private httpClient: HttpClient,
    private snackbarService: SnackbarService,
    private store: Store<fromApp.AppState>
  ) {
    this.store.select('auth').subscribe((state) => {
      this.token = state.user.token;
    });
  }

  getHeader() {
    let headers = new HttpHeaders();
    headers = headers = headers.set('Authorization', 'Bearer ' + this.token);

    return headers;
  }

  getIssues(){
    const headers= this.getHeader()
    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.get(this.url+'getIssues',{headers}).subscribe((data)=>{
      // console.log(data);

      this.store.dispatch(new fromIssuesAction.UpdateIssues(<Issue[]>data))
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }

  closeIssue(body){
    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.put(this.url+'issue/'+body+'/mark-closed',{}).subscribe((data)=>{
      this.getIssues();
      this.snackbarService.openSnackBar("This Issue has been Closed","Ok")
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }

  markAsRead(body){
    // console.log("here",body);

    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.put(this.url+'issue/'+body+'/is-read',{}).subscribe((data)=>{
      this.getIssues();
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }

  fetchChatMessages(body){
    const headers= this.getHeader();
    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.get(this.url+'issues/'+body+'/chat',{headers}).subscribe((data)=>{
      // console.log("chat",data);
      this.store.dispatch(new fromIssuesAction.UpdateChat(<Chat>data))
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }

  postMessage(body:any){
    const headers= this.getHeader()
    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.post(this.url+'newMessage',body,{headers}).subscribe((data)=>{
      // console.log("chat",data);
      this.fetchChatMessages(body.issueId)
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }

  markAsReadChat(body:any){
    const headers= this.getHeader()
    // console.log(headers);

    this.store.dispatch(new fromIssuesAction.ChangeLoading(true))
    this.httpClient.post(this.url+'chats/'+body+'/markSeen',{},{headers}).subscribe((data)=>{
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    },error=>{
      console.log(error);
      this.store.dispatch(new fromIssuesAction.ChangeLoading(false))
    })
  }
}
