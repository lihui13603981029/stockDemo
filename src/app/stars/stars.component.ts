import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {
  @Input()  rating:number;
  stars: boolean[];
  @Input()
  readonly:boolean = true;

  @Output()
  ratingChange:EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.stars = []; 
    for ( let i= 0; i < 5; i++) {
     this.stars.push(i > this.rating);
    }
  }
  clickStart(index:number):void {
    
   if(!this.readonly) {
      this.stars = [];
      this.rating = index ;
      for ( let i= 0; i < 5; i++) {
        this.stars.push(i > this.rating);
      }
     
      this.ratingChange.emit(this.rating);
    }
  }
}
