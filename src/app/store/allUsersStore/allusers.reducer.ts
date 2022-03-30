import { Action } from "@ngrx/store";
import * as fromAllUsersAction from './allusers.actions'


export interface AllUser{
  firstName:string,
  middleName:string,
  lastName:string,
  email:string,
  mobile:string,
  id:number,
  imageUrl:string,
  accountNumber: string,
  ifscCode: string,
  ssn: string,
  ssnVerified: boolean,
  sales: number,
  purchases: number,
  disputes: number
}

export interface State{
  user:AllUser[];
  unverifiedUser:AllUser[],
  isLoading:boolean;
}

const intialState:State={
  user: [],
  unverifiedUser:[],
  isLoading:false
}

export function allUserReducer(state=intialState,action:Action){
  const specificAction = action as fromAllUsersAction.AllUserAction;
  switch (specificAction.type){


    case fromAllUsersAction.CHANGELOADING:
      return {...state,isLoading:specificAction.payload};

    case fromAllUsersAction.UPDATEUNVERIFIEDUSER:
      return {...state,unverifiedUser:specificAction.payload};

    case fromAllUsersAction.UPDATEUSER:
      return {...state,user:specificAction.payload}

    default: return state;
  }

  return state;
}
