import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../websocket.service';

@Component({
  selector: 'app-start-menu',
  templateUrl: './start-menu.component.html',
  styleUrls: ['./start-menu.component.css']
})
export class StartMenuComponent implements OnInit {

  constructor(private wsService: WebsocketService) { }

  ngOnInit() {
  }

  initSocket (): void {
    this.wsService.initSocket();
  }

}
