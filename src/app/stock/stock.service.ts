import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StockService {

  constructor(
    public http: Http
  ) {}
  private header = new Headers({'Content-Type': 'application/json'});
  private stocks:Stock[];
  

  getStocks():Promise<Stock[]>{
    
    return this.http.get('/api').toPromise()
                .then(response => {
                  this.stocks = response.json();
                  return this.stocks;
                })
                .catch(this.handleError);
  }
  getStock(id:number):Promise<Stock> {

      return this.http.get('/api/stock/'+id).toPromise()
                                .then(respone => respone.json() )
                                .catch(this.handleError);

  }
  updataStock(item: Stock):Promise<any> {
   
     return this.http.post('/api/add/stock',item)
              .toPromise()
              .then(data => data.json())
              .catch(this.handleError);
  }

  deleteStock(stock:Stock):Promise<any> {

   return this.http.get('/api/delete/'+stock.id)
              .toPromise()
              .then(response => response.json())
              .catch(this.handleError);
  }

  //返回错误信息
  private  handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
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