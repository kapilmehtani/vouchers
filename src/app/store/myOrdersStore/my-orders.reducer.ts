import { Action } from '@ngrx/store';
import { Issue } from '../issuesStore/issues.reducer';
import {  Voucher } from '../voucherStore/voucher.reducer';
import * as fromMyOrdersAction from './my-orders.actions';

export interface Order {
  orderId: number;
  orderItemId: number;
  orderDate: Date;
  transactionId: string;
  orderItemPrice: number;
  voucher: Voucher[];
  issue: Issue;
  isChatUnSeen:boolean
}

export interface State {
  sellOrders: Voucher[];
  buyOrders: Order[];
  isLoading: boolean;
}

const intialState: State = {
  sellOrders: [],
  // sellOrders:[
  //   {
  //     voucherId:21,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  //   {
  //     voucherId:2,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:false
  //   },
  //   {
  //     voucherId:1,
  //     title:"voucher2",
  //     description:"des2 ",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:false
  //   },
  //   {
  //     voucherId:22,
  //     title:"voucher2 ",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  //   {
  //     voucherId:22,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  // ],
  buyOrders: [],
  // buyOrders: [
  //   {
  //     voucherId:21,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  //   {
  //     voucherId:2,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:false
  //   },
  //   {
  //     voucherId:1,
  //     title:"voucher2",
  //     description:"des2 ",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:false
  //   },
  //   {
  //     voucherId:22,
  //     title:"voucher2 ",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  //   {
  //     voucherId:22,
  //     title:"voucher2",
  //     description:"des2",
  //     sellingPrice:12,
  //     voucherValue:23,
  //     createdOn:"21-06-2021",
  //     expiryDate:"12-2-2022",
  //     imageUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     companyImgUrl:'http://www.equiti.com/media/11666/amazon.jpg',
  //     sellerId:1,
  //     sellerName:"Nav",
  //     sellerEmail:"nav@gmail.com",
  //     buyerId:2,
  //     buyerName:"Nav",
  //     buyerEmail:"nav@gmail.com",
  //     soldOn:"22/06/2021",
  //     paymentStatus:true
  //   },
  // ],
  isLoading: false,
};

export function myOrderReducer(state = intialState, action: Action) {
  const specificAction = action as fromMyOrdersAction.orderAction;
  switch (specificAction.type) {
    case fromMyOrdersAction.UPDATEBUYORDERS:
      return { ...state, buyOrders: specificAction.payload };

    case fromMyOrdersAction.UPDATESELLORDERS:
      return { ...state, sellOrders: specificAction.payload };

    case fromMyOrdersAction.CHANGELOADING:
      return { ...state, isLoading: specificAction.payload };
    default:
      return state;
  }

  return state;
}
