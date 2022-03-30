import { Action } from '@ngrx/store';
import { Profile } from '../authStore/auth.reducer';
import * as fromVoucherAction from './voucher.actions';

export interface Voucher {
  id:number,
      title:string,
      description:string,
      sellingPrice:number,
      voucherValue:number,
      createdOn:string,
      expiryDate:string,
      negotiable:boolean,
      isVerified:boolean,
      companyImgUrl:string,
      seller:Profile,
      imageUrl:string,

}


export interface State {
  verifiedVouchers: Voucher[],
  unverifiedVouchers:Voucher[]
  isLoading: boolean
}

const intialState: State = {
  verifiedVouchers:[],
  unverifiedVouchers: [
    // {
    //   id:21,
    //   title:"voucher2",
    //   description:"des2",
    //   sellingPrice:12,
    //   voucherValue:23,
    //   createdOn:"21-06-2021",
    //   expiryDate:"12-2-2022",
    //   isNegotiable:false,
    //   isVerified:true,
    //   companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    //   sellerId:1,
    //   sellerName:"Nav",
    //   sellerEmail:"nav@gmail.com",
    //   imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    // },
  ],
  isLoading: false,
};

export function voucherReducer(state = intialState, action: Action) {
  const specificAction = action as fromVoucherAction.VoucherAction;
  switch (specificAction.type) {
    case fromVoucherAction.UPDATEVERIFIEDVOUCHERS:
      return { ...state, verifiedVouchers: specificAction.payload };

    case fromVoucherAction.UPDATEUNVERIFIEDVOUCHERS:
      return { ...state, unverifiedVouchers: specificAction.payload };

    case fromVoucherAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };
    default:
      return state;
  }

  return state;
}
