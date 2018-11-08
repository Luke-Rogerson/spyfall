import { Component, OnInit, OnChanges } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnChanges  {

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.showAllCurrentPlayers();
    this.getRoomID();
  }

  ngOnChanges() {
    this.showAllCurrentPlayers();
  }

  // -----------------

  showAllCurrentPlayers() : void {
    this.wsService.getAllCurrentPlayers();
  }

  getRoomID() : void {
    this.wsService.getRoomID();
  }


}
