import { Component, OnInit, OnChanges } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  roomID: number;

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService
    .getRoomID().subscribe((roomID: number) => {
      this.roomID = roomID;
    });
  }

  // ngOnChanges() {
  //   this.showAllCurrentPlayers();
  // }

  // -----------------

  // showAllCurrentPlayers() : void {
  //   this.wsService.getAllCurrentPlayers();
  // }

  // getRoomID() : void {
  //   this.wsService.getRoomID();
  // }


}
