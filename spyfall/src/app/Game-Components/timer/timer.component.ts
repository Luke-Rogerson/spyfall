import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  timeRemaining = '08:00';

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService
      .remainingTime().subscribe((res) => {
        this.timeRemaining = moment().startOf('day')
                                     .seconds(res.timeRemaining)
                                     .format('mm:ss');
      });
  }

}
