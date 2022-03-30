
import { Action } from "@ngrx/store";
import { Company } from "./company.reducer";

export const UPDATECOMPANY='UPDATECOMPANY';
export const CHANGELOADING='CHANGELOADING';


export class UpdateCompany implements Action{
  readonly type=UPDATECOMPANY;
  public payload;
  constructor(payload:Company[]){
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

export type CompanyAction = UpdateCompany | ChangeLoading;

