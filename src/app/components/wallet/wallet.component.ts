import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { WalletService } from 'src/app/services/wallet.service';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromWalletAction from 'src/app/store/walletStore/wallet.actions'
import { Wallet } from 'src/app/store/walletStore/wallet.reducer';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  walletDescription:Wallet
  isLoading=false

  displayedColumns: string[] = [
    'transactionId',
    'amount',
    'transactionDate',
    'transactionType',
    'transactionStatus',
    'coinsAddedToWallet',
    'coinsDeductedFromWallet',
  ];

  addMoneyForm= new FormGroup({
    amount: new FormControl('null',Validators.required)
  })



  constructor(
    private walletService:WalletService,
    private store: Store<fromApp.AppState>,) {}

  ngOnInit(): void {
    this.walletService.getWallet();
    this.store.select('wallet').subscribe((state)=>{
      this.walletDescription=state.wallet
      // console.log(state);

      this.isLoading=state.isLoading
    })
  }

  addMoney(){
    // console.log(this.addMoneyForm.value)
  }
}
