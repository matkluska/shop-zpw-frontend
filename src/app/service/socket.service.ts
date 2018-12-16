import {Injectable} from '@angular/core';

import * as socketIo from 'socket.io-client';
import {environment} from '../../environments/environment';
import {TimeDiscount} from '../model/time-discount';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;

  constructor() {
    this.socket = socketIo(environment.serverURL);
  }

  public send(timeDiscount: TimeDiscount): void {
    this.socket.emit('newDiscount', timeDiscount);
  }

  public onTimeDiscount(): Observable<TimeDiscount> {
    return new Observable<TimeDiscount>(observer => {
      this.socket.on('newDiscount', (data: TimeDiscount) => observer.next(data));
    });
  }

  public onEndDiscount(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('endDiscount', (data: string) => observer.next(data));
    });
  }
}
