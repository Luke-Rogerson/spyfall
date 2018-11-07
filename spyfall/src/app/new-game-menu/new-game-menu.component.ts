import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-new-game-menu',
  templateUrl: './new-game-menu.component.html',
  styleUrls: ['./new-game-menu.component.css']
})
export class NewGameMenuComponent {

  constructor(private wsService: WebsocketService) {
  }

  joinRoom (): void {
    const id = parseInt(Math.random().toString().slice(2,6))
    this.wsService.createRoom(id);
  }

}
