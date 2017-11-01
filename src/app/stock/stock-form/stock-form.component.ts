import { Component, OnInit,Input} from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute,Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  stock: Stock;
  formModel:FormGroup;
  constructor(
    private  routerInfo:ActivatedRoute,
    private stockService:StockService,
    private router: Router
  ) { }

  ngOnInit() {
   let id = this.routerInfo.snapshot.params["id"];
   this.getStock(id);

   let fb = new FormBuilder();
   this.formModel = fb.group(
     {
      name:[this.stock.name,[Validators.required, Validators.minLength(3)]]
     }
  );

  }

  getStock(id:number) {
   this.stock = this.stockService.getStock(id);
  }

  cancel():void {
    this.router.navigate(['/stock']);
  }

  save():void {
    // this.router.navigate(['/stock']);
    console.log(this.formModel.value);
    
  }

}
