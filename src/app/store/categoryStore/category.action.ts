
import { Action } from "@ngrx/store";
import { Category } from "./category.reducer";

export const UPDATECATEGORY='UPDATECATEGORY';
export const CHANGELOADING='CHANGELOADING';


export class UpdateCategory implements Action{
  readonly type=UPDATECATEGORY;
  public payload;
  constructor(payload:Category[]){
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

export type CategoryAction = UpdateCategory | ChangeLoading;

