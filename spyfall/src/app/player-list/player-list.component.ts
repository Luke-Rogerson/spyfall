import { Component, OnInit } from '@angular/core';
import { Player } from '../player';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  // Will need to fetch from backend and store here

  players: Player[] = [new Player('Luke'), new Player('Marco'), new Player('Charlie')];

  constructor() { }

  ngOnInit() {
    console.log(this.players);
  }

}
