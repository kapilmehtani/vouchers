import { Action } from "@ngrx/store";
import { AllUser } from "./allusers.reducer"

export const UPDATEUSER="UPDATEUSER";
export const UPDATEUNVERIFIEDUSER="UPDATEUNVERIFIEDUSER"
export const CHANGELOADING='CHANGELOADING';


export class UpdateUser implements Action{
  readonly type = UPDATEUSER
  public payload;
  constructor(payload:AllUser[]){
    this.payload=payload;
  }
}

export class UpdateUnVerifiedUser implements Action{
  readonly type = UPDATEUNVERIFIEDUSER
  public payload;
  constructor(payload:AllUser[]){
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

export type AllUserAction = UpdateUnVerifiedUser |  UpdateUser | ChangeLoading;
