import { Action } from "@ngrx/store";
import { Voucher } from "./voucher.reducer";

export const UPDATEVERIFIEDVOUCHERS='UPDATEVERIFIEDVOUCHERS';
export const UPDATEUNVERIFIEDVOUCHERS='UPDATEUNVERIFIEDVOUCHERS';
export const CHANGELOADING='CHANGELOADING';

export class UpdateVerifiedVouchers implements Action{
  readonly type=UPDATEVERIFIEDVOUCHERS;
  public payload;
  constructor(payload:Voucher[]){
    this.payload=payload;
  }
}

export class UpdateUnverifiedVouchers implements Action{
  readonly type=UPDATEUNVERIFIEDVOUCHERS;
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




export type VoucherAction = UpdateVerifiedVouchers | UpdateUnverifiedVouchers | ChangeLoading;
