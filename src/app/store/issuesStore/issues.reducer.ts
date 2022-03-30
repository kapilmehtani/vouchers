import { Action } from '@ngrx/store';
import { Profile } from '../authStore/auth.reducer';
import { Order } from '../myOrdersStore/my-orders.reducer';
import * as fromIssuesAction from './issues.actions';

export interface Issue {
  issueId: number;
  comment: string;
  isRead: boolean;
  isClosed: boolean;
  createdDate: Date;
  orderItemId: number;
  userId: number;
  order: Order[];
  isChatUnSeen:boolean
}

export interface Chat {
  id: number;
  messages: Message[];
}

export interface Message {
  id: number;
  senderId: number;
  sender:Profile;
  chatId: number;
  message: string;
  sentOn: Date;
}

export interface State {
  issues: Issue[];
  chat: Chat;
  isLoading: boolean;
}

const intialState: State = {
  issues: [],
  chat: null,
  isLoading: false,
};

export function issuesReducer(state = intialState, action: Action) {
  const specificAction = action as fromIssuesAction.IssuesAction;
  switch (specificAction.type) {
    case fromIssuesAction.UPDATEISSUES:
      return { ...state, issues: specificAction.payload };

    case fromIssuesAction.UPDATECHAT:
      return { ...state, chat: specificAction.payload };

    case fromIssuesAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };

    default:
      return state;
  }

  return state;
}
