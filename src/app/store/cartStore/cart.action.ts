import { Action } from "@ngrx/store";
import { Voucher } from "../voucherStore/voucher.reducer";
import { State } from "./cart.reducer";

export const UPDATECART='UPDATECART';
export const CHANGELOADING='CHANGELOADING';


export class UpdateCart implements Action{
  readonly type=UPDATECART;
  public payload;
  constructor(payload:Voucher[]){
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

export type CartAction = UpdateCart | ChangeLoading;

