import { Component } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-new-game-menu',
  templateUrl: './new-game-menu.component.html',
  styleUrls: ['./new-game-menu.component.css']
})
export class NewGameMenuComponent {

 // inputName : string = ''; ngModel?

  constructor(private wsService: WebsocketService) {
  }

  joinRoom(name): void {
    const data = {
      name: name,
      id: parseInt(Math.random().toString().slice(2, 6))
    }
    this.wsService.createRoom(data);
  }

}
