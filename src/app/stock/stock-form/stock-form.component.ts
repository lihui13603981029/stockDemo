import { Component, OnInit,Input} from '@angular/core';
import { Stock, StockService } from '../stock.service';
import { ActivatedRoute,Router} from '@angular/router';
import { FormGroup, FormBuilder, Validators ,FormControl,FormArray} from "@angular/forms";

@Component({
  selector: 'app-stock-form',
  templateUrl: './stock-form.component.html',
  styleUrls: ['./stock-form.component.css']
})
export class StockFormComponent implements OnInit {
  categories: Array<string> = ["IT","金融","互联网"];
  stock: Stock =  new Stock(0,"", 0, 0, "", []);
  formModel:FormGroup;
  constructor(
    private  routerInfo:ActivatedRoute,
    private stockService:StockService,
    private router: Router
  ) { }

  ngOnInit() {
   let id = this.routerInfo.snapshot.params["id"];
   this.getStock(id);
  /**
   * 表单数据模型
   */  
   let fb = new FormBuilder();
   this.formModel = fb.group(
     {
      name:['',[Validators.required, Validators.minLength(3)]],
      price:['',Validators.required],
      desc:[''],
      categories:fb.array([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ],this.categoriesSelectValidator)
      
     }
  );

  }
  /**
   * 自定义验证 通过返回 null   不通过返回 {'xxxx':true}
   * @param control 传入参数
   */
  categoriesSelectValidator(control:FormArray){
    var valid = false;
    control.controls.forEach(control => {
      if (control.value) {
        valid = true;
      }
    })
    if (valid) {
      return null;
    }else {
     return  {categoriesLength:true};
    }
  }


  getStock(id:number) {
    
    this.stockService.getStock(id)
                      .then(respone =>{
                         this.stock = respone;
                        this.dataToFormModel(respone);  
                      });
  }
  //后台数据转化为formModel 表单
  dataToFormModel(respone) {

    this.formModel.reset({
      name:respone.name,
      price:respone.price,
      desc:respone.desc,
      categories:[
        respone.categories.indexOf(this.categories[0]) > -1,
        respone.categories.indexOf(this.categories[1]) > -1,
        respone.categories.indexOf(this.categories[2]) > -1,
      ]
    })

  }
  cancel():void {
    this.router.navigate(['/stock']);
  }

  save():void {
   
    console.log(this.formModel.invalid);
    var chineseCategories=[];
    for(var i = 0; i < 3; i++){
      if (this.formModel.value.categories[i]) {
        chineseCategories.push(this.categories[i]);
      }
    }

    this.formModel.value.categories = chineseCategories;
    this.formModel.value.rating = this.stock.rating;
    
    for (var key in this.formModel.value) {
      this.stock[key] = this.formModel.value[key];
    }

    this.stockService.updataStock(this.stock).then(data => console.log(data));

    this.router.navigate(['/stock']);
  }

}


