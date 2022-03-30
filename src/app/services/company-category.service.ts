import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as fromCompanyAction from '../store/companyStore/company.action';
import * as fromCategoryAction from '../store/categoryStore/category.action';
import { map } from 'rxjs/operators';
import {Category} from '../store/categoryStore/category.reducer';
import { Company } from '../store/companyStore/company.reducer';

@Injectable({
  providedIn: 'root'
})
export class CompanyCategoryService {
  url=environment.apiEndPoint;

  constructor(private httpClient:HttpClient,private store:Store<fromApp.AppState>) { }

  getCategory(){
    this.store.dispatch(new fromCategoryAction.ChangeLoading(true));
    this.httpClient.get(this.url+'getVoucherCategories').subscribe((data)=>{
      this.store.dispatch(new fromCategoryAction.UpdateCategory(<Category[]>data))
      this.store.dispatch(new fromCategoryAction.ChangeLoading(false));
    },error=>{
      this.store.dispatch(new fromCategoryAction.ChangeLoading(false));
    })

  }

  getCompany(){
    this.store.dispatch(new fromCompanyAction.ChangeLoading(true));
    this.httpClient.get(this.url+'getVoucherCompanies').subscribe((data)=>{
      this.store.dispatch(new fromCompanyAction.UpdateCompany(<Company[]>data))
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    },error=>{
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    })

  }

  getCompanyById(body){
    this.store.dispatch(new fromCompanyAction.ChangeLoading(true));
    this.httpClient.get(this.url+'companies/in/category/'+body).subscribe((data)=>{
      // console.log(data);
      this.store.dispatch(new fromCompanyAction.UpdateCompany(<Company[]>data))
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    },error=>{
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    })

  }

  getCompanyByArrayId(body){

    let newBody=JSON.parse(JSON.stringify(body))
    if(body.categories.length==0){
      this.getCompany()
      return
    }
    delete newBody.companies

    this.store.dispatch(new fromCompanyAction.ChangeLoading(true));
    this.httpClient.post(this.url+'companies/in/category',body).subscribe((data)=>{
      // console.log(data);
      this.store.dispatch(new fromCompanyAction.UpdateCompany(<Company[]>data))
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    },error=>{
      this.store.dispatch(new fromCompanyAction.ChangeLoading(false));
    })

  }
}
