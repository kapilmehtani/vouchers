import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromAppStore from './store/app.reducer';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FooterComponent } from './components/footer/footer.component';

import {MatMenuModule} from '@angular/material/menu';
import { SellComponent } from './components/sell/sell.component';
import { HomeComponent } from './components/home/home.component';
import { VoucherCardComponent } from './components/voucher-card/voucher-card.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

import {MatTableModule} from '@angular/material/table';
import { BuyOrdersComponent } from './components/buy-orders/buy-orders.component';
import { SellOrdersComponent } from './components/sell-orders/sell-orders.component';
import { OrderCardComponent } from './components/order-card/order-card.component';
import { CartComponent } from './components/cart/cart.component';
import { MatButtonModule } from '@angular/material/button';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

import { VoucherDetailComponent } from './components/voucher-detail/voucher-detail.component';
import { OtpComponent } from './components/otp/otp.component';
import { QuotePriceComponent } from './components/quote-price/quote-price.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WalletComponent } from './components/wallet/wallet.component';
import { SuccessComponent } from './components/success/success.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReportComponent } from './components/report/report.component';
import { ReviewComponent } from './components/review/review.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FaqComponent } from './components/faq/faq.component';
import { TermsComponent } from './components/terms/terms.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { NotificationComponent } from './components/notification/notification.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { IssueComponent } from './components/issue/issue.component';
import { NoDataComponent } from './components/no-data/no-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResetPasswordComponent,
    SignupComponent,
    HeaderComponent,
    FilterComponent,
    DialogComponent,
    FooterComponent,
    SellComponent,
    HomeComponent,
    VoucherCardComponent,
    MyProfileComponent,
    BuyOrdersComponent,
    SellOrdersComponent,
    OrderCardComponent,
    CartComponent,
    VoucherDetailComponent,
    OtpComponent,
    QuotePriceComponent,
    LoaderComponent,
    WalletComponent,
    SuccessComponent,
    CheckoutComponent,
    ReportComponent,
    ReviewComponent,
    FaqComponent,
    TermsComponent,
    ContactUsComponent,
    NotificationComponent,
    IssueComponent,
    NoDataComponent,
  ],
    imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(fromAppStore.appReducer),
    SocialLoginModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,
    MatSnackBarModule,
    MatButtonModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    NgxStarRatingModule,
    MatIconModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '319167875314-ce5vqd7ulr20hm06a3c1ufb1gjpohftj.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
