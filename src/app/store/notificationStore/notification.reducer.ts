import { Action } from '@ngrx/store';
import * as fromNotificationAction from './notification.actions';

export interface Notification {
  buyerId: number,
createdDate: string,
description: string,
id: number,
isComplete:boolean,
isSeen: boolean,
notificationType: string,
receiverId: number,
sellerId: number,
title: string,
voucherId: number
}

export interface State {
  notifications: Notification[],

  isLoading: boolean
}

const intialState: State = {
  notifications:[],
  isLoading: false,
};

export function notificationReducer(state = intialState, action: Action) {
  const specificAction = action as fromNotificationAction.NotificationAction;
  switch (specificAction.type) {
    case fromNotificationAction.UPDATENOTIFICATION:
      return { ...state, notifications: specificAction.payload };

    case fromNotificationAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };
    default:
      return state;
  }

  return state;
}
