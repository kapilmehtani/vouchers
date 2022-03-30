import { Action } from "@ngrx/store";
import { Profile, User } from "./auth.reducer";

export const LOGIN='LOGIN';
export const LOGOUT='LOGOUT';
export const UPDATEPROFILE="UPDATEPROFILE";
export const CHANGELOADING='CHANGELOADING';


export class Login implements Action{
  readonly type=LOGIN;
  public payload;
  constructor(payload:User){
    this.payload=payload;
  }
}

export class Logout implements Action{
  readonly type=LOGOUT;
  constructor(){
  }
}

export class UpdateProfile implements Action{
  readonly type = UPDATEPROFILE
  public payload;
  constructor(payload:Profile){
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

export type AuthAction = Login | Logout | UpdateProfile | ChangeLoading;
