import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-join-game-menu',
  templateUrl: './join-game-menu.component.html',
  styleUrls: ['./join-game-menu.component.css']
})
export class JoinGameMenuComponent implements OnInit {

  status: false;
  roomID: any;

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
  }

  onKey(event: any) {
    this.roomID = event.target.value;
  }

  joinGame(name, id): void {
    this.checkIfGameExists();
    const data = {
      name: name,
      id: id
    };
    this.wsService.joinRoom(data);
  }

  disconnectSocket(): void {
    this.wsService.disconnectSocket();
  }

  checkIfGameExists(): void {
    this.wsService.gameDoesNotExist();
    // this.status = !this.status;   This is to hide and show a warning message
  }

}
