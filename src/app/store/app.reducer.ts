import { ActionReducerMap } from '@ngrx/store';
import * as fromAuthReducer from './authStore/auth.reducer';
import * as fromVoucherReducer from './voucherStore/voucher.reducer';
import * as fromCompanyReducer from './companyStore/company.reducer';
import * as fromCategoryReducer from './categoryStore/category.reducer';
import * as fromMyOrdersReducer from './myOrdersStore/my-orders.reducer';
import * as fromCartReducer from './cartStore/cart.reducer';
import * as fromNotificationReducer from './notificationStore/notification.reducer';
import * as fromWalletReducer from './walletStore/wallet.reducer';
import * as fromAllUserReducer from './allUsersStore/allusers.reducer'
import * as fromIssuesReducer from './issuesStore/issues.reducer';
import * as fromGraphReducer from './graphStore/graph.reducer';
import * as fromPieChartReducer from './piechartStore/piechart.reducer';

export interface AppState{
  auth: fromAuthReducer.State,
  voucher:fromVoucherReducer.State,
  company: fromCompanyReducer.State,
  category: fromCategoryReducer.State,
  myOrders:fromMyOrdersReducer.State,
  cart:fromCartReducer.State,
  notification:fromNotificationReducer.State
  wallet: fromWalletReducer.State,
  alluser: fromAllUserReducer.State
  issue:fromIssuesReducer.State,
  graph:fromGraphReducer.State,
  piechart:fromPieChartReducer.State
}


export const appReducer:ActionReducerMap<AppState> = {
  auth :fromAuthReducer.authReducer,
  voucher:fromVoucherReducer.voucherReducer,
  company:fromCompanyReducer.companyReducer,
  category:fromCategoryReducer.categoryReducer,
  myOrders:fromMyOrdersReducer.myOrderReducer,
  cart: fromCartReducer.cartReducer,
  notification:fromNotificationReducer.notificationReducer,
  wallet:fromWalletReducer.walletReducer,
  alluser:fromAllUserReducer.allUserReducer,
  issue:fromIssuesReducer.issuesReducer,
  graph:fromGraphReducer.graphReducer,
  piechart:fromPieChartReducer.piechartReducer
}

