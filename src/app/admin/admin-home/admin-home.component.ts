import { Component, OnInit } from '@angular/core';
import { AdminVerifyService } from 'src/app/services/admin-verify.service';
import { TransactionCount } from 'src/app/store/graphStore/graph.reducer';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer'
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Revenue } from 'src/app/store/piechartStore/piechart.reducer';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  transactionCount:TransactionCount[];
  reveune:Revenue;
  isLoading=false;
  graphDataFormat='InMonth';
  public chartType: string = 'line';
  yearsList=[];

  public chartDatasets: Array<any>

  public chartLabels: Array<any>


  public chartColors: Array<any> = [

    {
      backgroundColor: 'rgba(255, 109, 2, 0.1) ',
      borderColor: 'rgba(255, 109, 2)',
      borderWidth: 1,
      fill:true,
      tension:0.4,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: 'No of Transactions'
        },
        beginAtZero:true,
          grace:'10%',
          ticks:{precision:0},
          grid: {
            display: false
          }
      },
      x: {
        title: {
          display: true,
          text: 'Dates'
        },
        grid: {
          display: false
        }
      },
  }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  graphDateForm:FormGroup;
  graphYearRangeForm:FormGroup;

  constructor(private adminService:AdminVerifyService,private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.setYearsList();
    let today=new Date();

    this.graphDateForm= new FormGroup({
      month:new FormControl(today),
      year:new FormControl(null),
    })
    this.graphYearRangeForm= new FormGroup({
      startYear:new FormControl(null,),
      endYear:new FormControl(null,),
    })
    this.fetchMonthData(today.setDate(1));
    this.graphDateForm.get('month').valueChanges.subscribe((value)=>{
      this.fetchMonthData(value);
    })

    this.graphDateForm.get('year').valueChanges.subscribe((value)=>{
      this.fetchYearData(value);
    })
    this.graphYearRangeForm.valueChanges.subscribe((value)=>{
      this.fetchYearWiseData(value);
    })


    this.store.select('graph').subscribe((state)=>{
      this.transactionCount=state.transactionCount;
      this.isLoading=state.isLoading;
      this.setGraphData();
    })
    this.store.select('piechart').subscribe((state)=>{
      this.reveune=state.revenue;
      this.isLoading=state.isLoading;
      this.setPieChartData();
    })
  }

  setGraphData(){

    this.chartDatasets=[{data:[],label:'Transactions'}];
    this.chartLabels=[];

    if (this.graphDataFormat=='InMonth' && !this.isLoading){
      let month = new Date(this.graphDateForm.get('month').value)
      let noOfDays= new Date(month.getFullYear(),month.getMonth()+1,0);
      let data=new Array(noOfDays?.getDate()).fill(0);
      this.transactionCount.forEach((date)=>{
        let day=new Date(date.date).getDate();

        data[day-1]=date.transactionCount;
      })
      for (let i = 0; i < data.length; i++) {
        this.chartLabels.push(i+1);
      }
      this.chartDatasets[0].data=data;
    }

    else if(this.graphDataFormat=='InYear' && !this.isLoading){
      this.chartLabels=[ "Jan", "Feb", "March", "April", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
      let data=new Array(12).fill(0);
      this.transactionCount.forEach((date)=>{
        let month=new Date(date.date).getMonth();
        data[month]=date.transactionCount;
      })
      this.chartDatasets[0].data=data;
    }

    else if(this.graphDataFormat=='ByYears' && !this.isLoading){
      for (let i = this.graphYearRangeForm.get('startYear').value;
       i <= this.graphYearRangeForm.get('endYear').value; i++) {
        this.chartLabels.push(i);
        let isYearCovered=false;
        this.transactionCount.forEach((date)=>{
          if(date.date==i){
          this.chartDatasets[0].data.push(date.transactionCount);
          isYearCovered=true
          }
        })
        if(!isYearCovered){
          this.chartDatasets[0].data.push(0);
        }
       }
    }

  }

  // fetchGraphData(){
  //   console.log(this.graphDateForm.value);
  //   if ()
  //   this.adminService.fetchGraphData(this.graphDateForm.value);
  // }

  fetchMonthData(month){
    if (month){

    this.graphDateForm.get('year').setValue(null);
    this.graphYearRangeForm.reset();
    this.graphDataFormat='InMonth';
    let startDate=new Date(month);
    this.chartOptions.scales.x.title.text='Dates';
    let endDate=new Date(startDate.getFullYear(),startDate.getMonth()+1,0);
    this.adminService.fetchGraphDataByMonth({startDate:startDate,endDate:endDate});
    this.adminService.fetchPieGraphData({startDate:startDate,endDate:endDate});
    }
  }

  fetchYearData(year){
    if (year){
    this.graphDateForm.get('month').setValue(null);
    this.graphYearRangeForm.reset();

    // this.graphDateForm.get('month').setValue(null);
    this.graphDataFormat='InYear';
    let startDate=new Date(year);
    let endDate=new Date(startDate.getFullYear(),11,31);
    this.chartOptions.scales.x.title.text='Months';
    this.adminService.fetchGraphDataByYear({startDate:startDate,endDate:endDate})
    this.adminService.fetchPieGraphData({startDate:startDate,endDate:endDate});
    }
  }

  fetchYearWiseData(yearRange){
    if (yearRange.startYear!=null && yearRange.endYear!=null) {
      this.graphDateForm.reset();
      this.graphDataFormat='ByYears';
    let startDate=new Date(this.graphYearRangeForm.get('startYear').value,0,1);
    let endDate=new Date(this.graphYearRangeForm.get('endYear').value,11,31)
    this.chartOptions.scales.x.title.text='Years';
    this.adminService.fetchGraphDataYearWise({startDate:startDate,endDate:endDate});
    this.adminService.fetchPieGraphData({startDate:startDate,endDate:endDate});
    }

  }

  setYearsList(){
    for (let i = 2015; i <= new Date().getFullYear(); i++) {
      this.yearsList.push(i);

    }
    // console.log(this.yearsList);

  }

  //Pie chart

  public piechartType: string = 'pie';

  public piechartDatasets: Array<any>;

  public piechartLabels: Array<any> = ['Buyer Commission', 'Seller Commission'];

  public piechartColors: Array<any> = [
    {
      backgroundColor: ['#FF6738', '#46BFBD', ],
      hoverBackgroundColor: ['#FF6600', '#5AD3D1', ],
      borderWidth: 2,
    }
  ];

  public piechartOptions: any = {
    responsive: true,
  };


  setPieChartData(){
    this.piechartDatasets = [
      { data: [], label: 'Revenue' }
    ];

    this.piechartDatasets[0].data.push(this.reveune.buyerAmountSum*0.025);
    this.piechartDatasets[0].data.push(this.reveune.buyerAmountSum*0.1 );
    // console.log(this.piechartDatasets);

  }
}
