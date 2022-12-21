import { Component, OnInit } from '@angular/core';
import { EventDriverService } from 'src/app/service/event-driver.service';
import { ActionEvent } from 'src/app/state/product.state';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

  counter:number = 0

  constructor(private eventDrivenService:EventDriverService) { }

  ngOnInit(): void {

    this.eventDrivenService.sourceEventSubjectObservable.subscribe((actionEvent:ActionEvent)=>{
      this.counter++
    })
  }

}
