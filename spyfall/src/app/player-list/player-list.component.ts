import { Component, OnChanges, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, OnChanges {

  player: string;
  players: any = [];
  roomID: any;

  constructor(private wsService: WebsocketService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.roomID = +params['id'];
    })
  }

  ngOnChanges() {
    this.getAllCurrentPlayers();
  }

  getAllCurrentPlayers(): void {
    this.wsService
      .getAllCurrentPlayers(this.roomID).subscribe((res: any) => {
        this.players = res.players;
      })
  }


}
