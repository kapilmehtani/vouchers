import { Action } from "@ngrx/store";
import { Wallet } from "./wallet.reducer";

export const UPDATEWALLET='UPDATEWALLET';
export const CHANGELOADING='CHANGELOADING';

export class UpdateWallet implements Action{
  readonly type=UPDATEWALLET;
  public payload;
  constructor(payload:Wallet){
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




export type WalletAction = UpdateWallet | ChangeLoading;
