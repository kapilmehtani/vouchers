import { Action } from "@ngrx/store";
import {  Revenue } from "./piechart.reducer";

export const UPDATEREVENUE='UPDATEREVENUE';

export const CHANGELOADING='CHANGELOADING';



export class UpdateRevenue implements Action{
  readonly type = UPDATEREVENUE;
  public payload;
  constructor(payload:Revenue){
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

export type PieChartAction =  UpdateRevenue | ChangeLoading ;
