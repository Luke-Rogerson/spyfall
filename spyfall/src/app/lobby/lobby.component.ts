import { Component, OnInit, OnChanges } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  roomID: string;

  constructor(private wsService: WebsocketService, private router: Router) { }

  ngOnInit() {
    this.wsService
    .getRoomID().subscribe((roomID: string) => {
      this.roomID = roomID;
    });
    this.startListeningForGames();
  }

  startListeningForGames() {
    this.wsService.startGameRes().subscribe((roomID: string) => {
      console.log('RECEIVED: ', roomID);
      this.router.navigateByUrl(`game/${roomID}`);
    });
  }

  startGame() {
    this.wsService.startGameReq(this.roomID);
  }
}
