import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit {

  location: string;
  role: string;

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.getRoleAndLocation();
  }

  getRoleAndLocation() {
    this.wsService.rolesAndLocation().subscribe((data) => {
      console.log('component', data);
    });
  }

}
