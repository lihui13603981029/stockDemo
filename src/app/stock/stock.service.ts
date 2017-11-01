import { Injectable } from '@angular/core';

@Injectable()
export class StockService {

  constructor(
   
  ) {
    
   }
   private stocks:Stock[] = [
    new Stock(1,"第一隻股票", 1.99, 3.5, "在慕課網學習", ["IT","internet"]),
    new Stock(2,"第二隻股票", 1.99, 3, "在慕課網學習", ["IT","internet"]),
    new Stock(3,"第三隻股票", 1.99, 1.5, "在慕課網學習", ["IT","internet"]),
    new Stock(4,"第四隻股票", 1.99, 2.5, "在慕課網學習", ["IT","internet"]),
    new Stock(5,"第五隻股票", 1.99, 4, "在慕課網學習", ["IT","internet"]),
  ]
  getStocks():Stock[] {

    return this.stocks;
  }

  getStock(id:number):Stock {
    var stock = this.stocks.find(stock => stock.id == id);
    //点击创建按钮，查不到数据  返回undefined
      if (!stock) {
        stock = new Stock(0,"第一隻股票", 0, 0, "", []);
      }
    return stock;
  }
}


export class Stock {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public rating: number,
    public desc: string,
    public categories: Array<string>
  ) {}
}