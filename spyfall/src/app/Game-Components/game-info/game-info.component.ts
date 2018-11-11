import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  role: string;
  location: string;


  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.getRoleAndLocation();
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
