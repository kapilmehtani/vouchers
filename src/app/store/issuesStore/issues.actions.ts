
import { Action } from "@ngrx/store";
import { Chat, Issue } from "./issues.reducer";

export const UPDATEISSUES='UPDATEISSUES';
export const UPDATECHAT='UPDATECHAT';
export const CHANGELOADING='CHANGELOADING';


export class UpdateIssues implements Action{
  readonly type=UPDATEISSUES;
  public payload;
  constructor(payload:Issue[]){
    this.payload=payload;
  }
}

export class UpdateChat implements Action{
  readonly type=UPDATECHAT;
  public payload;
  constructor(payload:Chat){
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

export type IssuesAction = UpdateIssues | UpdateChat | ChangeLoading;

