import { ComponentRef } from '@angular/core';
import { Component, OnInit , ViewContainerRef, ComponentFactoryResolver,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { OtpComponent } from '../otp/otp.component';
import { QuotePriceComponent } from '../quote-price/quote-price.component';
import { ReportComponent } from '../report/report.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(public dialog: MatDialog,private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: {component,email,price,voucherId,order,isSellOrder}) { }

  ngOnInit(): void {
    if (this.data.component==ResetPasswordComponent){
      const factory = this.componentFactoryResolver.resolveComponentFactory(ResetPasswordComponent);
    const ref: ComponentRef<ResetPasswordComponent> = this.viewContainerRef.createComponent(factory);
    ref.instance.email=this.data.email;
    ref.changeDetectorRef.detectChanges();
    }
    else if (this.data.component==OtpComponent){
      const factory = this.componentFactoryResolver.resolveComponentFactory(OtpComponent);
    const ref: ComponentRef<OtpComponent> = this.viewContainerRef.createComponent(factory);
    ref.instance.email=this.data.email;
    ref.changeDetectorRef.detectChanges();
    }
    else if (this.data.component==QuotePriceComponent){
      const factory = this.componentFactoryResolver.resolveComponentFactory(QuotePriceComponent);
    const ref: ComponentRef<QuotePriceComponent> = this.viewContainerRef.createComponent(factory);
    ref.instance.price=this.data.price;
    ref.instance.voucherId=this.data.voucherId;
    ref.changeDetectorRef.detectChanges();
    }
    else if(this.data.component==ReportComponent ){
      const factory = this.componentFactoryResolver.resolveComponentFactory(ReportComponent);
    const ref: ComponentRef<ReportComponent> = this.viewContainerRef.createComponent(factory);
    ref.instance.order=this.data.order;
    ref.instance.isSellOrder=this.data.isSellOrder;
    ref.changeDetectorRef.detectChanges();
    }
    else if(this.data.component==ReviewComponent ){
      const factory = this.componentFactoryResolver.resolveComponentFactory(ReviewComponent);
    const ref: ComponentRef<ReviewComponent> = this.viewContainerRef.createComponent(factory);
    ref.instance.order=this.data.order;
    ref.changeDetectorRef.detectChanges();
    }
    else {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.data.component);
    const ref = this.viewContainerRef.createComponent(factory);
    ref.changeDetectorRef.detectChanges();
    }
  }

  closeDialog(){
    this.dialog.closeAll();
  }

}
