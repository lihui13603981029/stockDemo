import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Stock, StockService } from './../stock.service';
import { FormControl } from '@angular/forms';
import 'rxjs/Rx';

@Component({
  selector: 'app-stock-manage',
  templateUrl: './stock-manage.component.html',
  styleUrls: ['./stock-manage.component.css']
})
export class StockManageComponent implements OnInit {
  private stocks:Array<Stock>;
  private nameFilter:FormControl = new FormControl();
  private keyword:string;
  constructor(
    public router:Router,
    private stockService: StockService
  ) { }

  ngOnInit() {
    this.requestData();
    this.nameFilter.valueChanges
    .debounceTime(500)
    .subscribe(value => this.keyword = value);
  }

  requestData(){
    this.stockService.getStocks().then( response => {
      this.stocks = response;
     
    }).catch(error => console.log(error));
  }
  //创建股票
  creat():void {
    this.router.navigateByUrl('/stock/0');
  }
  
  //编辑股票
  updata(stock:Stock):void {
    this.router.navigateByUrl('/stock/'+stock.id);
  }

  //删除股票
  delete(stock:Stock):void{
    this.stockService.deleteStock(stock)
                     .then(response => this.stocks = response)
                     .catch(error => console.log(error));

  }
}
