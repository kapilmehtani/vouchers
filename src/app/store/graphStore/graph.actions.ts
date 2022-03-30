import { Action } from "@ngrx/store";
import {  TransactionCount } from "./graph.reducer";

export const UPDATETRANSACTIONCOUNT='UPDATETRANSACTIONCOUNT';

export const CHANGELOADING='CHANGELOADING';



export class UpdateTransactionCount implements Action{
  readonly type = UPDATETRANSACTIONCOUNT;
  public payload;
  constructor(payload:TransactionCount[]){
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

export type GraphAction =  UpdateTransactionCount | ChangeLoading ;
