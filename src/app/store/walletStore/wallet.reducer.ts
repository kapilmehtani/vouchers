import { Action } from '@ngrx/store';
import * as fromWalletAction from './wallet.actions';

export interface Wallet {
    id:number,
    coins:number,
    transactions:Transactions[]
}

export interface Transactions {
  id: string,
  orderId: number,
  totalPrice: number,
  transactionDate: Date,
  transactionType: string,
  transactionStatus:string,
  coinsAddedToWallet:number
}

export interface State {
  wallet:Wallet
  isLoading: boolean
}

const intialState: State = {
  wallet: null,
  isLoading:false
};

export function walletReducer(state = intialState, action: Action) {
  const specificAction = action as fromWalletAction.WalletAction;
  switch (specificAction.type) {
    case fromWalletAction.UPDATEWALLET:
      return { ...state, wallet: specificAction.payload };

    case fromWalletAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };
    default:
      return state;
  }

  return state;
}
