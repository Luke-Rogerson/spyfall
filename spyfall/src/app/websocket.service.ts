import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  private socket;

  constructor() {
  }

  initSocket(): void {
    this.socket = io.connect('http://localhost:3000');
  }

  createRoom(data: object): void {
    this.socket.emit('create', data);
  }

  joinRoom(data: object): void {
    this.socket.emit('join', data);
  }

  disconnectSocket(): void {
    this.socket.disconnect();
  }

  gameDoesNotExist(): void { // Check if room exists when joining a game
    this.socket.on('message', (data) => {
      return;
    });
  }

  getRoomID = () => {
    return Observable.create((observer) => {
      this.socket.on('roomID', (roomID) => {
        observer.next(roomID);
      });
    });
  }

  getAllCurrentPlayers = (roomID: string) => {
    return Observable.create((observer) => {
      this.socket.on('currentPlayers', (res) => {
        if (res.roomID === roomID) {
          observer.next(res);
        }
      });
    });
  }

  startGameReq = (roomID: string) => {
    this.socket.emit('startGameReq', roomID);
  }

  startGameRes = () => {
    return Observable.create((observer) => {
      this.socket.on('startGameRes', (roomID) => {
        observer.next(roomID);
      });
    });
  }

  rolesAndLocation = () => {
    return Observable.create((observer) => {
      this.socket.on('roleAndLocation', (res) => {
        observer.next(res);
      });
    });
  }

  remainingTime = () => {
    return Observable.create((observer) => {
      this.socket.on('beginCountdown', (res) => {
        observer.next(res);
      });
    });
  }

}
