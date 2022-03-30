import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IssuesService } from 'src/app/services/issues.service';
import { Chat } from 'src/app/store/issuesStore/issues.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  issueId: number;
  chat: Chat;
  user;
  isLoading=false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private issueService: IssuesService,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.issueId = params?.id;
    });
  }

  ngOnInit(): void {
    this.issueService.fetchChatMessages(this.issueId);
    this.issueService.markAsReadChat(this.issueId);
    this.store.select('issue').subscribe((state) => {
      console.log('state', state);
      this.chat = state.chat;
      this.isLoading=state.isLoading
      // console.log(this.chat);
    });
    this.store.select('auth').subscribe((profile) => {
      // console.log('profile', profile);
      this.user = profile.user;
    });
    this.scrollToBottom();
  }

  chatMessage = new FormGroup({
    issueId: new FormControl(),
    message: new FormControl(null, Validators.required),
  });

  send(id) {
    // console.log(id);
    this.chatMessage.controls.issueId.setValue(id);
    //  this.chatMessage.patchValue({
    //   issuedId:id
    //  })
    this.issueService.postMessage(this.chatMessage.value);
    this.chatMessage.reset();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  closeChat(){
    // console.log("here");

    this.router.navigateByUrl('/buy-orders')
  }
}
