import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  @Input() notifications;
  constructor(private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.changeNotificationSeen();
  }

  acceptQuotedPrice(voucherId,buyerId,notificationId){
    this.notificationService.acceptQuotedPrice(voucherId,buyerId);
    this.notificationService.changeIsComplete(notificationId);
  }

  rejectQuotedPrice(voucherId,buyerId,notificationId){
    this.notificationService.rejectQuotedPrice(voucherId,buyerId);
    this.notificationService.changeIsComplete(notificationId);
  }

  changeNotificationSeen(){
    this.notifications.forEach((notification)=>{
      if (!notification.isSeen) this.notificationService.changeNotificationSeen(notification.id);
    })
  }


}
