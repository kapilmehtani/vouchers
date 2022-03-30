import { Action } from "@ngrx/store";
import { Notification } from "./notification.reducer";

export const UPDATENOTIFICATION='UPDATENOTIFICATION';
export const CHANGELOADING='CHANGELOADING';

export class UpdateNotifications implements Action{
  readonly type=UPDATENOTIFICATION;
  public payload;
  constructor(payload:Notification[]){
    this.payload=payload;
  }
}




export class ChangeLoading implements Action{
  readonly type=CHANGELOADING;
  public payload;
  constructor(payload:boolean){
    this.payload=payload;
  }
}




export type NotificationAction = UpdateNotifications  | ChangeLoading;
