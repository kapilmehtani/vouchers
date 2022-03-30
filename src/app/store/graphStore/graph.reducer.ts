import { Action } from '@ngrx/store';
import * as fromGraphAction from './graph.actions';


export interface TransactionCount {
  date: string,
transactionCount: number
}


export interface State {
  isLoading: boolean;
  transactionCount: TransactionCount[];
}

const intialState: State = {
  isLoading: false,
  transactionCount: [],
};

export function graphReducer(state = intialState, action: Action) {
  const specificAction = action as fromGraphAction.GraphAction;
  switch (specificAction.type) {
    case fromGraphAction.UPDATETRANSACTIONCOUNT:
      return { ...state, transactionCount: specificAction.payload };

    case fromGraphAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };

    default:
      return state;
  }
}
