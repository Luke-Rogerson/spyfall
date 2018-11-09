import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-new-game-menu',
  templateUrl: './new-game-menu.component.html',
  styleUrls: ['./new-game-menu.component.css']
})
export class NewGameMenuComponent {

  id: number = parseInt(Math.random().toString().slice(2, 6))

  constructor(private wsService: WebsocketService) {
  }

  createGame(name): void {
    const data = {
      name: name,
      id: this.id
    }
    this.wsService.createRoom(data);
  }

  disconnectSocket(): void {
    this.wsService.disconnectSocket();
  }

}
