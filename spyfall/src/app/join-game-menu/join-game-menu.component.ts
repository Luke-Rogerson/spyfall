import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-join-game-menu',
  templateUrl: './join-game-menu.component.html',
  styleUrls: ['./join-game-menu.component.css']
})
export class JoinGameMenuComponent implements OnInit {

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
  }

  joinGame(name, id): void {
    const data = {
      name: name,
      id: id
    }
    this.wsService.joinRoom(data);
  }

  disconnectSocket(): void {
    this.wsService.disconnectSocket();
  }

}
