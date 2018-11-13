import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';
import * as moment from 'moment';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  role: string;
  location: string;
  timeRemaining = '08:00';

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.getRoleAndLocation();
    this.wsService
      .remainingTime().subscribe((res) => {
        this.timeRemaining = moment().startOf('day')
                                     .seconds(res.timeRemaining)
                                     .format('mm:ss');
      });
  }

   async getRoleAndLocation() {
     await this.wsService.rolesAndLocation().subscribe((data) => {
      this.role = data.role;
      this.location = data.location;
    });

  }

  // {role: "Mechanic", location: "Passenger Train"}
  // {role: "Spy", location: "???"}

}
