import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stockFilter'
})
export class StockFilterPipe implements PipeTransform {

  //参数说明：数组过滤的列表  过滤条件  用户输入的内容
  transform(list:any[], field:string, keyword:string): any {
    if(!field || !keyword){
      return list;
    }
    return list.filter(item => {
      let itemFieldValue = item[field].toLowerCase();
      return itemFieldValue.indexOf(keyword) >= 0;
    });
  }

}
