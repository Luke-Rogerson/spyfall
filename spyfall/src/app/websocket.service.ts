import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
// import { Observable } from 'rxjs/Observable';
// import * as Rx from 'rxjs/Rx';
// import { enviroment } from '../environments/environment'

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private socket;

  constructor() {
  }

  initSocket (): void {
    this.socket = io('http://localhost:3000')
  }

  createRoom(id: number): void {
    this.socket.emit('create', id);
  }

}
