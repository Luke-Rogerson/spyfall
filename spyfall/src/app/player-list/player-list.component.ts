import { Component, OnChanges, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnChanges {

  player: string;
  players: any = [];

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.getAllCurrentPlayers();
  }

  ngOnChanges() {
    this.getAllCurrentPlayers();
  }

  getAllCurrentPlayers(): void {
    this.wsService
    .getAllCurrentPlayers().subscribe((res: any) => {
      this.players = res.players;
    })
  }


}
