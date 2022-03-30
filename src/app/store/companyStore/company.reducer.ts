import { Action } from '@ngrx/store';
import * as fromCompanyAction from './company.action';

export interface Company {
  id: number;
  name: string;
}
export interface State {
  company: Company[];
  isLoading: boolean;
}

const intialState: State = {
  company: [],
  isLoading: false,
};

export function companyReducer(state=intialState,action:Action){
  const specificAction = action as fromCompanyAction.CompanyAction;
  switch (specificAction.type){
    case fromCompanyAction.UPDATECOMPANY:
      return {...state,company:specificAction.payload};

    case fromCompanyAction.CHANGELOADING:
      return {...state,isLoading:specificAction.payload};

    default: return state;
  }

  return state;
}
