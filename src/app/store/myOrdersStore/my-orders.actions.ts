import { Action } from "@ngrx/store";
import { Voucher } from "../voucherStore/voucher.reducer";
import { Order } from "./my-orders.reducer";

export const UPDATEBUYORDERS='UPDATEBUYORDERS';
export const UPDATESELLORDERS='UPDATESELLORDERS';
export const CHANGELOADING='CHANGELOADING';

export class UpdateBuyOrders implements Action{
  readonly type=UPDATEBUYORDERS;
  public payload;
  constructor(payload:Order[]){
    this.payload=payload;
  }
}

export class UpdateSellOrders implements Action{
  readonly type=UPDATESELLORDERS;
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

export type orderAction = UpdateSellOrders | UpdateBuyOrders | ChangeLoading;
