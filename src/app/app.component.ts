import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer'
import * as fromAuthAction from 'src/app/store/authStore/auth.actions';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { NotificationService } from './services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'voucher-money';
  notifications=[];
  notificationCount=0;
  isLoading=false;
  token='';
  showNotifications=false;

  constructor(public router: Router,private store:Store<fromApp.AppState>,
  private cartService:CartService,private notificationService:NotificationService,
  private authService:AuthService){

  }
  ngOnInit(): void {
    const tokenFromLocalStorage=localStorage.getItem('token');
    const userId=localStorage.getItem('userId');
    // console.log(localStorage.getItem('token'));

    if(tokenFromLocalStorage){
      this.store.dispatch(new fromAuthAction.Login({token:tokenFromLocalStorage,userId:userId}))
      this.cartService.getCart();
      this.notificationService.getNotification();
    }

    this.store.select('notification').subscribe((state)=>{
      this.notifications=state.notifications;
      this.isLoading = state.isLoading;
      this.notificationCounter();
    })
    this.store.select('auth').subscribe((state)=>{
      this.token=state.user.token
      this.notificationCounter();
    })
  }

  logout() {
    this.authService.logout();
  }


  notificationCounter(){
    this.notificationCount=0
    this.notifications.forEach((notification)=>{
      if (!notification.isSeen)  this.notificationCount++;
    })
  }

  closeNotifications(){
    this.notificationService.getNotification();
    this.showNotifications=false;
  }

}
