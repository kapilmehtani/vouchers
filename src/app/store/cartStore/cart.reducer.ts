import { Action } from '@ngrx/store';
import { Voucher } from '../voucherStore/voucher.reducer';
import * as fromCartAction from './cart.action';

export interface State {
  vouchers: Voucher[];
  isLoading: boolean;
}

// const intialState: State = {
//   vouchers:[] ,
//   isLoading: false,
// };

const intialState: State = {
  vouchers: [
    // {
    //   id:2,
    //   title:"voucher2",
    //   description:"des2",
    //   sellingPrice:12,
    //   voucherValue:23,
    //   createdOn:"21-06-2021",
    //   expiryDate:"12-2-2022",
    //   isNegotiable:true,
    //   isVerified:true,
    //   companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    //   sellerId:1,
    //   sellerName:"Nav",
    //   sellerEmail:"nav@gmail.com",
    //   imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',

    // },
    // {
    //   id:1,
    //   title:"voucher2",
    //   description:"des2 ",
    //   sellingPrice:12,
    //   voucherValue:23,
    //   createdOn:"21-06-2021",
    //   expiryDate:"12-2-2022",
    //   isNegotiable:false,
    //   isVerified:false,
    //   companyImgUrl:'https://www.jamesgood.co.uk/sites/default/files/Logo-Blog_07.png',
    //   sellerId:1,
    //   sellerName:"Nav",
    //   sellerEmail:"nav@gmail.com",
    //   imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    // },
    // {
    //   id:22,
    //   title:"voucher2 ",
    //   description:"des2",
    //   sellingPrice:12,
    //   voucherValue:23,
    //   createdOn:"21-06-2021",
    //   expiryDate:"12-2-2022",
    //   isNegotiable:false,
    //   isVerified:true,
    //   companyImgUrl:'https://media.glassdoor.com/sqll/300494/flipkart-com-squarelogo-1433217726546.png',
    //   sellerId:1,
    //   sellerName:"Nav",
    //   sellerEmail:"nav@gmail.com",
    //   imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    // },
    // {
    //   id:22,
    //   title:"voucher2",
    //   description:"des2",
    //   sellingPrice:12,
    //   voucherValue:23,
    //   createdOn:"21-06-2021",
    //   expiryDate:"12-2-2022",
    //   isNegotiable:true,
    //   isVerified:false,
    //   companyImgUrl:'https://media.glassdoor.com/sqll/300494/flipkart-com-squarelogo-1433217726546.png',
    //   sellerId:1,
    //   sellerName:"Nav",
    //   sellerEmail:"nav@gmail.com",
    //   imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
    // },
  ],
  isLoading: false,
};

export function cartReducer(state=intialState,action:Action){
  const specificAction = action as fromCartAction.CartAction;
  switch (specificAction.type){
    case fromCartAction.UPDATECART:
      return {...state,vouchers:specificAction.payload};

    case fromCartAction.CHANGELOADING:
      return {...state,isLoading:specificAction.payload};

    default: return state;
  }

  return state;
}
