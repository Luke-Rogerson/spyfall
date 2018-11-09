import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/websocket.service';

@Component({
  selector: 'app-main-game-display',
  templateUrl: './main-game-display.component.html',
  styleUrls: ['./main-game-display.component.css']
})
export class MainGameDisplayComponent implements OnInit {

  roomID: string;

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
    this.wsService
    .getRoomID().subscribe((roomID: string) => {
      this.roomID = roomID;
    });
  }

}
