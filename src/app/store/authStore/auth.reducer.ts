import { Action } from "@ngrx/store";
import * as fromAuthAction from './auth.actions'

export interface User{
  token:string,
  userId:string
  // ,userId:number,email:string,firstName:string,middleName:string,lastName:string,mobile:string
}
export interface Profile{
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
  ssnVerified: boolean
}

export interface State{
  user:User;
  profile:Profile,
  isLoading:boolean;
}

const intialState:State={
  user: {token:'',userId:''
  // ,userId:0,email:'',firstName:'',middleName:'',lastName:'',mobile:''
},
  profile:null,
  isLoading:false
}

export function authReducer(state=intialState,action:Action){
  const specificAction = action as fromAuthAction.AuthAction;
  switch (specificAction.type){
    case fromAuthAction.LOGIN:
      return {...state,user:specificAction.payload};

    case fromAuthAction.CHANGELOADING:
      return {...state,isLoading:specificAction.payload};

    case fromAuthAction.UPDATEPROFILE:
      return {...state,profile:specificAction.payload}

    case fromAuthAction.LOGOUT:
    return intialState;

    default: return state;
  }

  return state;
}
