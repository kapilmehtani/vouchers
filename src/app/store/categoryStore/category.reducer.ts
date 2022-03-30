import { Action } from '@ngrx/store';
import * as fromCategoryAction from './category.action';

export interface Category {
  id: number;
  name: string;
}
export interface State {
  category: Category[];
  isLoading: boolean;
}

const intialState: State = {
  category:[] ,
  isLoading: false,
};

export function categoryReducer(state=intialState,action:Action){
  const specificAction = action as fromCategoryAction.CategoryAction;
  switch (specificAction.type){
    case fromCategoryAction.UPDATECATEGORY:
      return {...state,category:specificAction.payload};

    case fromCategoryAction.CHANGELOADING:
      return {...state,isLoading:specificAction.payload};

    default: return state;
  }

  return state;
}
