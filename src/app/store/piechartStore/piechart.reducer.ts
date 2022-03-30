import { Action } from '@ngrx/store';
import * as fromPieChartAction from './piechart.actions';


export interface Revenue {
  buyerAmountSum: number
commissionSum: number
sellerAmountSum: number
}


export interface State {
  isLoading: boolean;
  revenue: Revenue;
}

const intialState: State = {
  isLoading: false,
  revenue: {buyerAmountSum: 0,
    commissionSum: 0,
    sellerAmountSum: 0},
};

export function piechartReducer(state = intialState, action: Action) {
  const specificAction = action as fromPieChartAction.PieChartAction;
  switch (specificAction.type) {
    case fromPieChartAction.UPDATEREVENUE:
      return { ...state, revenue: specificAction.payload };

    case fromPieChartAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };

    default:
      return state;
  }
}
