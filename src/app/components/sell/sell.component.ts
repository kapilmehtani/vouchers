import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CompanyCategoryService } from 'src/app/services/company-category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { VoucherService } from 'src/app/services/voucher.service';
import * as fromApp from 'src/app/store/app.reducer';
import { Category } from 'src/app/store/categoryStore/category.reducer';
import { Company } from 'src/app/store/companyStore/company.reducer';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss'],
})
export class SellComponent implements OnInit {
  category: Category[] = [];
  company: Company[] = [];
  isLoading=false;
  isUploading=false;

  constructor(
    private voucherService: VoucherService,
    private store: Store<fromApp.AppState>,
    private companyCategoryService: CompanyCategoryService,
    private snackbarService:SnackbarService
  ) {}

  ngOnInit(): void {
    this.companyCategoryService.getCategory();
    this.companyCategoryService.getCompany();
    this.store.select('company').subscribe((state) => {
      this.company = state.company;
      this.isLoading=state.isLoading;

    });
    this.store.select('category').subscribe((state) => {
      this.category = state.category;
      this.isLoading=state.isLoading;
    });
  }

  sellVoucherForm = new FormGroup({
    categoryId: new FormControl(null, Validators.required),
    companyId: new FormControl(null, Validators.required),
    voucherValue: new FormControl(null, Validators.required),
    voucherCode: new FormControl(null, Validators.required),
    sellingPrice: new FormControl(null, Validators.required),
    expiryDate: new FormControl(null, Validators.required),
    negotiable: new FormControl(false),
    description: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    file: new FormControl(null,Validators.required),
    imageUrl: new FormControl(null,Validators.required),
    voucherType:new FormControl(null,Validators.required),
    terms: new FormControl(null,Validators.required)
  });


  fileUpload= new FormGroup({
    fileSource:new FormControl(null)
  })

  onFileChange(event) {
      // console.log("here");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.uploadFile(file);
      this.fileUpload.patchValue({
        fileSource: file,
      });
      this.uploadFile();
    }
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.fileUpload.get('fileSource').value);
    formData.append('upload_preset', 'aos8bajz');
    this.isUploading=true;
    const upload=this.voucherService.uploadFile(formData).subscribe((data:any)=>{
      // console.log(data);

      if (data.type === HttpEventType.UploadProgress) {
        const percentDone = Math.round(100 * data.loaded / data.total);
        this.snackbarService.openSnackBar(('Progress ' + percentDone + '%'),'Ok');
      }
      this.isUploading=false
      this.sellVoucherForm.patchValue({
        imageUrl:data.url
      })
    },(error)=>{this.isUploading=false;console.log(error);
    });

  }

  getCompanyById(id){
    // console.log(id);
    this.companyCategoryService.getCompanyById(id);

  }

  submitDetails() {
    // console.log(this.sellVoucherForm.value);
    this.voucherService.addNewVoucher(this.sellVoucherForm.value);
  }
}
