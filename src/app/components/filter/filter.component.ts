import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CompanyCategoryService } from 'src/app/services/company-category.service';
import { VoucherService } from 'src/app/services/voucher.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Category } from 'src/app/store/categoryStore/category.reducer';
import { Company } from 'src/app/store/companyStore/company.reducer';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  vouchers=[]
  category: Category[] = [];
  company:Company[]=[]
  isLoading=false;
  showCategories=false;
  showBrands=false;
  categoryId=0

  constructor(
    private store: Store<fromApp.AppState>,
    private companyCategoryService: CompanyCategoryService,
    private voucherService:VoucherService,
    private router:Router
  ) {
    if(this.router.getCurrentNavigation().extras.state){
      this.categoryId=(this.router.getCurrentNavigation().extras.state?.categoryId);
      this.companyCategoryService.getCompanyById(this.categoryId)
      this.filter.categories.push(this.categoryId)
      this.voucherService.getFilteredVouchers(this.filter)
    }
    else{
      this.companyCategoryService.getCompany();
      this.voucherService.getVerifiedVoucher();
    }
   }

  ngOnInit(): void {
    this.companyCategoryService.getCategory();
    this.store.select('category').subscribe((state) => {
      // console.log(state.category);

      this.category = state.category;
      this.isLoading=state.isLoading;
    });
    this.store.select('company').subscribe((state) => {
      this.company = state.company;
      this.isLoading=state.isLoading;
    });
    this.store.select('voucher').subscribe((state)=>{
      this.vouchers=state.verifiedVouchers;
      this.isLoading = state.isLoading;
    })
  }

  searchForm = new FormGroup({
    input: new FormControl(null),
  });

  filter={
    categories:[],
    companies:[],
    // averageRating:null,
    isVerified:null
  }

  arrayWithoutElementAtIndex = function (arr:any, index:any) {
    return arr.filter(function(value, arrIndex) {
      return index !== arrIndex;
    });
  }

  insertCategoriesIntoFIlter(checked,id){
    if(checked){
      this.filter.categories.push(id)
    }
    else{
      this.filter.categories=this.arrayWithoutElementAtIndex(this.filter.categories,this.filter.categories.indexOf(id))
    }
    this.companyCategoryService.getCompanyByArrayId(this.filter)
    this.voucherService.getFilteredVouchers(this.filter)
  }

  insertCompaniesIntoFIlter(checked,id){
    if(checked){
      this.filter.companies.push(id)
    }
    else{
      this.filter.companies=this.arrayWithoutElementAtIndex(this.filter.companies,this.filter.companies.indexOf(id))
    }
    this.voucherService.getFilteredVouchers(this.filter)
  }

  insertVerifiedIntoFIlter(checked){
    if(checked){
      this.filter.isVerified=true
    }
    else{
      this.filter.isVerified=null
    }
    this.voucherService.getFilteredVouchers(this.filter)
  }

  searchVoucher() {
    this.voucherService.searchVoucher(this.searchForm.value);
  }

  findInArray(id){
    const element=this.filter.companies.filter((companyId)=>companyId==id)
    return element
  }
}
