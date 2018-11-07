import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }
}
