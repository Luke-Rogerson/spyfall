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
    this.socket = io.connect('http://localhost:3000')
  }

  createRoom(data: object): void {
    this.socket.emit('create', data);
  }

  joinRoom(data: object): void {
    this.socket.emit('join', data);
  }

  disconnectSocket (): void {
    this.socket.disconnect();
  }

  gameDoesNotExist (): void { // Check when joining a game
    this.socket.on('message', (data) => {
      return;
    })
  }

}
